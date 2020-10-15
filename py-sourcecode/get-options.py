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

with open(r"C:\Users\diogo\Desktop\CNAES 2020\Lista Candidatos.json", encoding = "utf8") as json_file1:
    candidatos = json.load(json_file1)
with open(r"C:\Users\diogo\Desktop\CNAES 2020\Lista Colocados2.json", encoding = "utf8") as json_file2:
    colocados = json.load(json_file2)

class Aluno:
    def __init__(self, nome, opcao):
        self.Nome = nome
        self.Opcao = opcao

start = "[" + datetime.now().strftime("%H:%M:%S") + "] Script iniciado\n"
JSONarray = []
AlunosTerminados = []
TotalAlunos = 0

try:
    for x in range(len(candidatos)):
        for j in range(len(candidatos[x]['data'])):
            for k in range(len(candidatos[x]['data'][j]['candidatos'])):
                IsStudentAlreadySaved = False
                for h in range(len(AlunosTerminados)):
                    if str(candidatos[x]['data'][j]['candidatos'][k]['nome']) == AlunosTerminados[h].Nome and str(candidatos[x]['data'][j]['candidatos'][k]['nota_10ano_11ano']) == AlunosTerminados[h].Nota_10ano_11ano and str(candidatos[x]['data'][j]['candidatos'][k]['nota_12ano']) == AlunosTerminados[h].Nota_12ano:
                        IsStudentAlreadySaved = True
                if not IsStudentAlreadySaved:
                    TotalAlunos += 1
                    EncontrouColocado = False
                    clear()
                    print(str(start))
                    print("Número " + str(TotalAlunos) + " de 62561\n")
                    JSONcontent = ""
                    JSONcontent = { "nome": str(candidatos[x]['data'][j]['candidatos'][k]['nome']), "nota_10ano_11ano": str(candidatos[x]['data'][j]['candidatos'][k]['nota_10ano_11ano']), "nota_12ano": str(candidatos[x]['data'][j]['candidatos'][k]['nota_12ano']) }
                    JSONcontent['opcoes'] = []
                    MesmoNome = []
                    for c in range(len(candidatos)):
                        for p in range(len(candidatos[c]['data'])):
                            for i in range(len(candidatos[c]['data'][p]['candidatos'])):
                                # Todas as pessoas com o meso nome sao inseridas no array MesmoNome
                                if str(candidatos[x]['data'][j]['candidatos'][k]['nome']) == str(candidatos[c]['data'][p]['candidatos'][i]['nome']):
                                    MesmoNome.append(Aluno(str(candidatos[c]['data'][p]['candidatos'][i]['nome']), str(candidatos[c]['data'][p]['candidatos'][i]['opcao'])))
                            # Ver se o array de MesmoNome tem opcoes repetidas
                            for q in range(len(MesmoNome)):
                                for w in range(len(MesmoNome)):



                                    # if str(candidatos[x]['data'][j]['candidatos'][k]['nota_12ano']) == str(candidatos[c]['data'][p]['candidatos'][i]['nota_12ano']):
                                        # if str(candidatos[x]['data'][j]['candidatos'][k]['nota_10ano_11ano']) == str(candidatos[c]['data'][p]['candidatos'][i]['nota_10ano_11ano']):
                                            colocado = "false"
                                            if not EncontrouColocado:
                                                for r in range(len(colocados)):
                                                    for t in range(len(colocados[r]['data'])):
                                                        for y in range(len(colocados[r]['data'][t]['colocados'])):
                                                            if str(candidatos[x]['data'][j]['candidatos'][k]['nome']) == str(colocados[r]['data'][t]['colocados'][y]['nome']):
                                                                if str(candidatos[c]['data'][p]['curso']) == str(colocados[r]['data'][t]['curso']):
                                                                    EncontrouColocado = True
                                                                    colocado = "true"
                                            JSONcontent['opcoes'].append({
                                                "nome_curso": str(candidatos[c]['data'][p]['curso']),
                                                "nome_faculdade": str(candidatos[c]['estabelecimento']),
                                                "cod_curso": str(candidatos[c]['data'][p]['codigo_curso']),
                                                "cod_faculdade": str(candidatos[c]['codigo_estabelecimento']),
                                                "nota_candidatura": str(candidatos[c]['data'][p]['candidatos'][i]['nota']),
                                                "prova_ingresso": str(candidatos[c]['data'][p]['candidatos'][i]['prova_ingresso']),
                                                "opcao": str(candidatos[c]['data'][p]['candidatos'][i]['opcao']),
                                                "colocado": str(colocado)
                                            })
                    AlunosTerminados.append(Aluno(str(candidatos[x]['data'][j]['candidatos'][k]['nome']), str(candidatos[x]['data'][j]['candidatos'][k]['nota_12ano']), str(candidatos[x]['data'][j]['candidatos'][k]['nota_10ano_11ano'])))
                    JSONarray.append(JSONcontent)
    with open(r'C:\Users\diogo\Desktop\final.json', 'w') as f:
        f.write(json.dumps(JSONarray))
except Exception as e:
    print(str(e))
    traceback.print_exc()

print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")

# [Fim] Código para obter as opções de cada aluno

pause()
