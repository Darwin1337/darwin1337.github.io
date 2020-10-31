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

fase = 3
DriverPath = r"F:\External Drive(G#)\Backup 2020\Diogo\chromedriver.exe"
driver = webdriver.Chrome(DriverPath)
driver.set_window_position(2000,2000)
link = ["https://www.dges.gov.pt/coloc/2020/col" + str(fase) + "listas.asp?CodR=11&action=2", "https://www.dges.gov.pt/coloc/2020/col" + str(fase) + "listas.asp?CodR=12&action=2"]
print("[" + datetime.now().strftime("%H:%M:%S") + "] Script iniciado\n")
JSONarray = []

# [Começo] Código para os colocados

try:
    for p in range(2):
        driver.get(link[p])
        for x in range(len(driver.find_elements_by_class_name("inputtext > option"))):
            JSONindex = 0
            JSONcontent = ""
            JSONcontent = { "estabelecimento": str(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('innerHTML')[7:]), "codigo_estabelecimento": str(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('value')) }
            print("Faculdade: " + str(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('innerHTML')[7:]) + "\n")
            Select(driver.find_elements_by_class_name('inputtext')[0]).select_by_value(driver.find_elements_by_class_name("inputtext > option")[x].get_attribute('value'))
            driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/form/table[2]/tbody/tr[2]/td/input[4]").click()
            JSONcontent['data'] = []
            for j in range(len(driver.find_elements_by_class_name("inputtext > option"))):
                print("Curso: " + driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('innerHTML')[7:].replace("\n", ""))
                JSONcontent['data'].append({ "curso": driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('innerHTML')[7:].replace("\n", ""), "codigo_curso": driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('value') })
                Select(driver.find_elements_by_class_name('inputtext')[0]).select_by_value(driver.find_elements_by_class_name("inputtext > option")[j].get_attribute('value'))
                driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/form/table[2]/tbody/tr[2]/td/input[3]").click()
                JSONcontent['data'][int(JSONindex)]['colocados'] = []
                print("Encontrados " + str(len(driver.find_elements_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[3]/tbody/tr"))) + " alunos colocados neste curso\n")
                for c in range(len(driver.find_elements_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[3]/tbody/tr"))):
                    JSONcontent['data'][int(JSONindex)]['colocados'].append({ "nome": str(driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/table[3]/tbody/tr[%s]" % (c + 1)).find_elements_by_tag_name('td')[1].get_attribute('innerHTML').replace("/n", "")) })
                driver.find_element_by_xpath("/html/body/div/table/tbody/tr/td/div[2]/a").click()
                JSONindex = JSONindex + 1
            JSONarray.append(JSONcontent)
            driver.get(link[p])
    print("A guardar ficheiro com a informação...")
    with open(r'C:\Users\diogo\Desktop\Lista Colocados_another.json', 'w') as f:
        f.write(json.dumps(JSONarray))
    driver.quit()
    print("[" + datetime.now().strftime("%H:%M:%S") + "] Script concluído com sucesso.")
except Exception as e:
    driver.set_window_position(960,540)
    print(str(e))
    traceback.print_exc()

# [Fim] Código para os colocados

pause()
