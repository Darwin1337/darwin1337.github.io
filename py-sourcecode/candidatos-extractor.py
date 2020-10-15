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

DriverPath = r"C:\Users\diogo\Desktop\chromedriver.exe"
driver = webdriver.Chrome(DriverPath)

link = ["https://www.dges.gov.pt/coloc/2020/col2listas.asp?CodR=11&action=2", "https://www.dges.gov.pt/coloc/2020/col2listas.asp?CodR=12&action=2"]
print("[" + datetime.now().strftime("%H:%M:%S") + "] Script iniciado\n")
JSONarray = []

# [Começo] Código para os candidatos

TotalCandidatos = 0

try:
    for p in range(2):
        driver.get(link[p])
        for x in range(len(driver.find_elements_by_class_name("inputtext > option"))):
            time.sleep(1)
            JSONindex = 0
            JSONcontent = ""
            JSONcontent = { "estabelecimento": str(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('innerHTML')[7:]), "codigo_estabelecimento": str(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('value')) }
            print("Faculdade: " + str(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('innerHTML')[7:]))
            Select(driver.find_elements_by_class_name('inputtext')[0]).select_by_value(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('value'))
            driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/form/table[2]/tbody/tr[2]/td/input[5]").click()
            JSONcontent['data'] = []
            for j in range(len(driver.find_elements_by_class_name("inputtext > option"))):
                MaisQueUmaPagina = False
                print("Curso: " + driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('innerHTML')[7:].replace("\n", ""))
                JSONcontent['data'].append({ "curso": driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('innerHTML')[7:].replace("\n", ""), "codigo_curso": driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('value') })
                Select(driver.find_elements_by_class_name('inputtext')[0]).select_by_value(driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('value'))
                driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/form/table[2]/tbody/tr[2]/td/input[3]").click()
                JSONcontent['data'][int(JSONindex)]['candidatos'] = []
                if driver.find_elements_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[2]/tbody/tr/td/a"):
                    MaisQueUmaPagina = True
                    print("O curso tem mais que 1 página de candidatos, a gerar URL...")
                    URLGerado = "https://www.dges.gov.pt/coloc/2020/col2listaser.asp?CodEstab=" + str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[2]/tbody/tr/td/a").get_attribute("href").split("=")[1].split("&")[0]) + "&CodCurso=" + str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[2]/tbody/tr/td/a").get_attribute("href").split("=")[2].split("&")[0]) + "&ids=1&ide=" + str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[2]/tbody/tr/td/a").get_attribute("href").split("=")[5]) + "&Mx=" + str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[2]/tbody/tr/td/a").get_attribute("href").split("=")[5])
                    print("URL gerado: " + URLGerado)
                    driver.execute_script('''window.open("","_blank");''')
                    driver.switch_to.window(driver.window_handles[1])
                    driver.get(URLGerado)
                    time.sleep(1)
                else:
                    print("O curso só tem uma página de candidatos")
                    time.sleep(1)
                print("Encontrados " + str(len(driver.find_elements_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr"))) + " alunos candidatos a este curso, a guardar a sua informação...")
                TotalCandidatos = TotalCandidatos + int(len(driver.find_elements_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr")))
                for c in range(len(driver.find_elements_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr"))):
                    opcao = ""
                    if "1" in str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[4].get_attribute('innerHTML').replace("/n", "").strip()):
                        opcao = "1"
                    else:
                        opcao = str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[4].get_attribute('innerHTML').replace("/n", "").strip())
                    JSONcontent['data'][int(JSONindex)]['candidatos'].append({
                    "nome": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[2].get_attribute('innerHTML').replace("/n", "").strip()),
                    "cc": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[1].get_attribute('innerHTML').replace("/n", "").strip()),
                    "nota": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[3].get_attribute('innerHTML').replace("/n", "").strip()),
                    "opcao": opcao, "prova_ingresso": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[5].get_attribute('innerHTML').replace("/n", "").strip()),
                    "nota_12ano": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[6].get_attribute('innerHTML').replace("/n", "").strip()),
                    "nota_10ano_11ano": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[4]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[7].get_attribute('innerHTML').replace("/n", "").strip())
                    })
                if MaisQueUmaPagina == True:
                    print("Como há mais que uma página, teremos de fechar a aba aberta")
                    driver.close()
                    time.sleep(1)
                    driver.switch_to.window(driver.window_handles[0])
                driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/a").click()
                print("Candidatos guardados: " + str(TotalCandidatos))
                JSONindex = JSONindex + 1
            JSONarray.append(JSONcontent)
            driver.get(link[p])
    print("A guardar ficheiro com a informação...")
    with open(r'C:\Users\diogo\Desktop\Lista Candidatos.json', 'w') as f:
        f.write(json.dumps(JSONarray))
    driver.quit()
    print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")
except Exception as e:
    print(str(e))
    traceback.print_exc()

# [Fim] Código para os candidatos

pause()
