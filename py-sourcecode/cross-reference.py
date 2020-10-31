import os
import time
import json
import traceback
from datetime import datetime

def clear():
    os.system('cls' if os.name=='nt' else 'clear')

def pause():
    os.system("pause")

# [Começo] Código para a cross reference

with open(r"C:\Users\diogo\Desktop\New\3a fase\Lista Candidatos.json", encoding = "utf8") as json_file1:
    candidatos = json.load(json_file1)
with open(r"C:\Users\diogo\Desktop\New\3a fase\Lista Colocados_Normal.json", encoding = "utf8") as json_file2:
    colocados = json.load(json_file2)

print("[" + datetime.now().strftime("%H:%M:%S") + "] Script iniciado\n")
JSONarray = []
TotalAlunos = 0

try:
    for x in range(len(colocados)):
        JSONindex = 0
        JSONcontent = ""
        JSONcontent = { "estabelecimento": str(colocados[x]['estabelecimento']), "codigo_estabelecimento": str(colocados[x]['codigo_estabelecimento']) }
        JSONcontent['data'] = []
        for j in range(len(colocados[x]['data'])):
            JSONcontent['data'].append({ "curso": str(colocados[x]['data'][j]['curso']), "codigo_curso": str(colocados[x]['data'][j]['codigo_curso']) })
            JSONcontent['data'][int(JSONindex)]['colocados'] = []
            for k in range(len(colocados[x]['data'][j]['colocados'])):
                AlunoEncontrado = False
                TotalAlunos = TotalAlunos + 1
                print("Aluno " + str(TotalAlunos) + " de 50964")
                print("Nome: " + str(colocados[x]['data'][j]['colocados'][k]['nome']))
                for m in range(len(candidatos[x]['data'][j]['candidatos'])):
                    if str(candidatos[x]['data'][j]['candidatos'][m]['nome']) == str(colocados[x]['data'][j]['colocados'][k]['nome']):
                        AlunoEncontrado = True
                        print("Sucesso!")
                        JSONcontent['data'][int(JSONindex)]['colocados'].append({
                            "nome": str(candidatos[x]['data'][j]['candidatos'][m]['nome']),
                            "nota": str(candidatos[x]['data'][j]['candidatos'][m]['nota']),
                            "opcao": str(candidatos[x]['data'][j]['candidatos'][m]['opcao'])
                        })
                        break
            try:
                if not AlunoEncontrado:
                    print("Erro! Aluno não encontrado!")
            except:
                pass
            JSONindex = JSONindex + 1
        JSONarray.append(JSONcontent)
    with open(r'C:\Users\diogo\Desktop\cross_reference_2afase.json', 'w') as f:
        f.write(json.dumps(JSONarray))
except Exception as e:
    print(str(e))
    traceback.print_exc()
print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")

# [Fim] Código para a cross reference

pause()
