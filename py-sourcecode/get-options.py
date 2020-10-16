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



    with open(r'C:\Users\diogo\Desktop\final.json', 'w') as f:
        f.write(json.dumps(JSONarray))
except Exception as e:
    print(str(e))
    traceback.print_exc()

print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")

# [Fim] Código para obter as opções de cada aluno

pause()
