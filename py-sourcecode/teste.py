import os
import time
import json
import traceback
from datetime import datetime

def clear():
    os.system('cls' if os.name=='nt' else 'clear')

def pause():
    os.system("pause")

with open(r"C:\Users\diogo\Documents\GitHub\darwin1337.github.io\json\primeira-fase\Detalhes Alunos.json", encoding = "utf8") as json_file1:
    alunos = json.load(json_file1)
with open(r"C:\Users\diogo\Desktop\missing.json", encoding = "utf8") as json_file2:
    missing = json.load(json_file2)

class Aluno:
    def __init__(self, nome, nota_12ano, nota_10ano_11ano):
        self.Nome = nome
        self.Nota_12ano = nota_12ano
        self.Nota_10ano_11ano = nota_10ano_11ano

AlunosTerminados = []

for x in range(len(alunos)):
    AlunosTerminados.append(Aluno(str(alunos[x]['nome']), str(alunos[x]['nota_12ano']), str(alunos[x]['nota_10ano_11ano'])))
print("Todos os alunos foram adicionados à lista.")


with open(r"C:\Users\diogo\Desktop\CNAES 2020\Lista Colocados2.json", encoding = "utf8") as json_file3:
    colocados = json.load(json_file3)


pause()
