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
with open(r"C:\Users\diogo\Documents\GitHub\darwin1337.github.io\json\primeira-fase\Lista Colocados.json", encoding = "utf8") as json_file2:
    colocados = json.load(json_file2)

# class Estabelecimento:
#     def __init__(self, nome, codigo)
#         self.Nome = nome
#         self.Codigo = codigo
#
# class Curso:
#     def __init__(self, nome, codigo)
#         self.Nome = nome
#         self.Codigo = codigo

class Aluno:
    def __init__(self, nome, opcao, nota, provaingresso, nota12, nota10_11, cc, codEstab, codCurso, nomeEstab, nomeCurso, maxCandidatos, alunoPos):
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

start = "[" + datetime.now().strftime("%H:%M:%S") + "] Script iniciado\n"

JSONarray = []
AlunosTerminados = []
TotalAlunos = 0
teste = ["RAQUEL TAVARES PINHEIRO", "MARTA PINTO GOMES", "DIOGO JOSÉ OLIVEIRA BORGES TEIXEIRA", "ANA CAROLINA TEIXEIRA DIAS", "RAFAEL JESUS REGO FREITAS"]

# 0 - 68 > Ensino universitário
# 69 - 163 > Ensino politécnico

try:
    for x in range(len(candidatos)):
        for j in range(len(candidatos[x]['data'])):
            for k in range(len(candidatos[x]['data'][j]['candidatos'])):
                if str(candidatos[x]['data'][j]['candidatos'][k]['nome']) in teste:
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
                                        str(i)))
                        print(str(candidatos[x]['data'][j]['candidatos'][k]['nome']))
                        if sum(int(p.Opcao) == 1 for p in MesmoNome) > 1:
                            print("Este nome NAO e unico!\n")
                            DriverPath = r"F:\External Drive(G#)\Backup 2020\Diogo\chromedriver.exe"
                            driver = webdriver.Chrome(DriverPath)
                            driver.set_window_position(2000,2000)
                            for q in range(len(MesmoNome)):
                                driver.get("https://www.dges.gov.pt/coloc/2020/col1listaser.asp?CodEstab=" + str(MesmoNome[q].CodEstab) + "&CodCurso=" + str(MesmoNome[q].CodCurso) + "&ids=1&ide=" + str(MesmoNome[q].MaxCandidatos) + "&Mx=" + str(MesmoNome[q].MaxCandidatos))
                                time.sleep(1)
                                OnlyCC[q] = str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (int(MesmoNome[q].AlunoPos) + 1)).find_elements_by_tag_name('td')[1].get_attribute('innerHTML').replace("/n", "").strip())
                                MesmoNome[q].CC = str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (int(MesmoNome[q].AlunoPos) + 1)).find_elements_by_tag_name('td')[1].get_attribute('innerHTML').replace("/n", "").strip())
                                if int(q) == len(MesmoNome) - 1: driver.quit()
                        else:
                            print("Este nome E unico!\n")
                        for q in range(len(set(OnlyCC))):
                            TotalAlunos += 1
                            print("Alunos: " + str(TotalAlunos) + " de 62561\n")
                            EncontrouColocado = False
                            JSONcontent = ""
                            JSONcontent = {
                                "nome": str(MesmoNome[0].Nome),
                                "nota_10ano_11ano": str(MesmoNome[0].Nota10_11),
                                "nota_12ano": str(MesmoNome[0].Nota12)
                            }
                            JSONcontent['opcoes'] = []
                            for c in range(len(MesmoNome)):
                                if str(OnlyCC[q]) == str(MesmoNome[c].CC):
                                    colocado = "false"
                                    if not EncontrouColocado:
                                        for r in range(len(colocados)):
                                            for t in range(len(colocados[r]['data'])):
                                                for y in range(len(colocados[r]['data'][t]['colocados'])):
                                                    if str(MesmoNome[c].Nome) == str(colocados[r]['data'][t]['colocados'][y]['nome']):
                                                        if str(MesmoNome[c].NomeCurso) == str(colocados[r]['data'][t]['curso']):
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
                            JSONarray.append(JSONcontent)
                        AlunosTerminados.append(str(MesmoNome[c].NomeCurso))
    with open(r'C:\Users\diogo\Desktop\detalhes_teste.json', 'w') as f:
        f.write(json.dumps(JSONarray))
except Exception as e:
    print(str(e))
    traceback.print_exc()


print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")

# [Fim] Código para obter as opções de cada aluno

pause()
