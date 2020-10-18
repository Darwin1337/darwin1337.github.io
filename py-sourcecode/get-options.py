import os
import time
import json
import traceback
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from datetime import datetime

def clear():
    os.system('cls' if os.name=='nt' else 'clear')

def pause():
    os.system("pause")

# [Começo] Código para obter as opções de cada aluno

with open(r"C:\Users\diogo\Documents\GitHub\darwin1337.github.io\json\primeira-fase\Lista Candidatos.json", encoding = "utf8") as json_file1:
    candidatos = json.load(json_file1)
with open(r"C:\Users\diogo\Desktop\New\1a fase\[Verified] Lista Colocados_Detalhada.json", encoding = "utf8") as json_file2:
    colocados = json.load(json_file2)

DriverPath = r"F:\External Drive(G#)\Backup 2020\Diogo\chromedriver.exe"
driver = webdriver.Chrome(DriverPath)
driver.set_window_position(2000,2000)

class Aluno:
    def __init__(self, nome, opcao, nota, provaingresso, nota12, nota10_11, cc, codEstab, codCurso, nomeEstab, nomeCurso, maxCandidatos, alunoPos, idxEstab, idxCurso):
        self.Nome = nome
        self.Opcao = opcao
        self.Nota = nota
        self.ProvaIngresso = provaingresso
        self.Nota12 = nota12
        self.Nota10_11 = nota10_11
        self.CC = cc
        self.CodEstab = codEstab
        self.CodCurso = codCurso
        self.NomeEstab = nomeEstab
        self.NomeCurso = nomeCurso
        self.MaxCandidatos = maxCandidatos
        self.AlunoPos = alunoPos
        self.IdxEstab = idxEstab
        self.IdxCurso = idxCurso

start = "[" + datetime.now().strftime("%H:%M:%S") + "] Script iniciado\n"

fase = 1
JSONarray = []
AlunosTerminados = []
TotalAlunos = 0
SemColocacao = 0

try:
    for x in range(len(candidatos)):
        for j in range(len(candidatos[x]['data'])):
            for k in range(len(candidatos[x]['data'][j]['candidatos'])):
                if str(candidatos[x]['data'][j]['candidatos'][k]['nome']) not in AlunosTerminados:
                    MesmoNome = []
                    OnlyCC = []
                    for q in range(len(candidatos)):
                        for c in range(len(candidatos[q]['data'])):
                            for i in range(len(candidatos[q]['data'][c]['candidatos'])):
                                if str(candidatos[x]['data'][j]['candidatos'][k]['nome']) == str(candidatos[q]['data'][c]['candidatos'][i]['nome']):
                                    OnlyCC.append("null")
                                    MesmoNome.append(Aluno(
                                    str(candidatos[q]['data'][c]['candidatos'][i]['nome']),
                                    str(candidatos[q]['data'][c]['candidatos'][i]['opcao']),
                                    str(candidatos[q]['data'][c]['candidatos'][i]['nota']),
                                    str(candidatos[q]['data'][c]['candidatos'][i]['prova_ingresso']),
                                    str(candidatos[q]['data'][c]['candidatos'][i]['nota_12ano']),
                                    str(candidatos[q]['data'][c]['candidatos'][i]['nota_10ano_11ano']),
                                    "null",
                                    str(candidatos[q]['codigo_estabelecimento']),
                                    str(candidatos[q]['data'][c]['codigo_curso']),
                                    str(candidatos[q]['estabelecimento']),
                                    str(candidatos[q]['data'][c]['curso']),
                                    str(len(candidatos[q]['data'][c]['candidatos'])),
                                    str(i), str(q), str(c)))
                    if sum(int(p.Opcao) == 1 for p in MesmoNome) > 1:
                        for q in range(len(MesmoNome)):
                            driver.get("https://www.dges.gov.pt/coloc/2020/col" + str(fase) + "listaser.asp?CodEstab=" + str(MesmoNome[q].CodEstab) + "&CodCurso=" + str(MesmoNome[q].CodCurso) + "&ids=1&ide=" + str(MesmoNome[q].MaxCandidatos) + "&Mx=" + str(MesmoNome[q].MaxCandidatos))
                            time.sleep(1)
                            OnlyCC[q] = str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (int(MesmoNome[q].AlunoPos) + 1)).find_elements_by_tag_name('td')[1].get_attribute('innerHTML').replace("/n", "").strip())
                            MesmoNome[q].CC = str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (int(MesmoNome[q].AlunoPos) + 1)).find_elements_by_tag_name('td')[1].get_attribute('innerHTML').replace("/n", "").strip())
                    newCC = list(set(OnlyCC))
                    for q in range(len(newCC)):
                        for c in range(len(MesmoNome)):
                            if str(newCC[q]) == str(MesmoNome[c].CC):
                                TotalAlunos += 1
                                print("Alunos: " + str(TotalAlunos) + " de 62561")
                                EncontrouColocado = False
                                JSONcontent = ""
                                JSONcontent = {
                                    "nome": str(MesmoNome[c].Nome),
                                    "nota_10ano_11ano": str(MesmoNome[c].Nota10_11),
                                    "nota_12ano": str(MesmoNome[c].Nota12)
                                }
                                JSONcontent['opcoes'] = []
                                break
                        for c in range(len(MesmoNome)):
                            if str(newCC[q]) == str(MesmoNome[c].CC):
                                colocado = "false"
                                if not EncontrouColocado:
                                    for y in range(len(colocados[int(MesmoNome[c].IdxEstab)]['data'][int(MesmoNome[c].IdxCurso)]['colocados'])):
                                        if str(MesmoNome[c].Nome) == str(colocados[int(MesmoNome[c].IdxEstab)]['data'][int(MesmoNome[c].IdxCurso)]['colocados'][y]['nome']):
                                            if str(MesmoNome[c].NomeCurso) == str(colocados[int(MesmoNome[c].IdxEstab)]['data'][int(MesmoNome[c].IdxCurso)]['curso']):
                                                EncontrouColocado = True
                                                colocado = "true"
                                JSONcontent['opcoes'].append({
                                    "nome_curso": str(MesmoNome[c].NomeCurso),
                                    "nome_faculdade": str(MesmoNome[c].NomeEstab),
                                    "cod_curso": str(MesmoNome[c].CodCurso),
                                    "cod_faculdade": str(MesmoNome[c].CodEstab),
                                    "nota_candidatura": str(MesmoNome[c].Nota),
                                    "prova_ingresso": str(MesmoNome[c].ProvaIngresso),
                                    "opcao": str(MesmoNome[c].Opcao),
                                    "colocado": str(colocado)
                                })
                        if not EncontrouColocado:
                            SemColocacao += 1
                            with open(r'C:\Users\diogo\Desktop\sem_colocacao.txt', 'a') as f:
                                f.write(str(SemColocacao) + ". " + str(candidatos[x]['data'][j]['candidatos'][k]['nome']) + "\n")
                        JSONarray.append(JSONcontent)
                    AlunosTerminados.append(str(MesmoNome[c].Nome))
    driver.quit()
    with open(r'C:\Users\diogo\Desktop\detalhes_teste.json', 'w') as f:
        f.write(json.dumps(JSONarray))
except Exception as e:
    print(str(e))
    traceback.print_exc()

print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")

# [Fim] Código para obter as opções de cada aluno

pause()
