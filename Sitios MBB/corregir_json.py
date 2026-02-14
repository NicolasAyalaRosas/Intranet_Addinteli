import json
import pandas as pd
import os

# -------- CONFIGURACIÓN --------
archivo_json = r"C:\Users\nicolas.ayala\OneDrive\Intranet\Sitios MBB\Antenas_03_02_26.json"
archivo_excel = r"C:\Users\nicolas.ayala\OneDrive\Intranet\Sitios MBB\Reemplazos a realizar en Sitios.xlsx"
archivo_salida = r"C:\Users\nicolas.ayala\OneDrive\Intranet\Sitios MBB\Antenas_03_02_26_corregido.json"
# --------------------------------

print("Iniciando proceso...")

# 1️⃣ Leer tabla de reemplazos
df = pd.read_excel(archivo_excel)
print("Excel cargado correctamente")

col_incorrecta = df.columns[0]
col_correcta = df.columns[1]

reemplazos = dict(zip(df[col_incorrecta], df[col_correcta]))
print("Reemplazos cargados:", len(reemplazos))


# 2️⃣ Función recursiva
def corregir_texto(obj):
    if isinstance(obj, dict):
        nuevo_dict = {}
        for k, v in obj.items():
            nueva_clave = k
            for incorrecta, correcta in reemplazos.items():
                nueva_clave = nueva_clave.replace(str(incorrecta), str(correcta))
            nuevo_dict[nueva_clave] = corregir_texto(v)
        return nuevo_dict

    elif isinstance(obj, list):
        return [corregir_texto(item) for item in obj]

    elif isinstance(obj, str):
        for incorrecta, correcta in reemplazos.items():
            obj = obj.replace(str(incorrecta), str(correcta))
        return obj

    else:
        return obj


# 3️⃣ Leer JSON
with open(archivo_json, "r", encoding="utf-8") as f:
    data = json.load(f)

print("JSON cargado correctamente")

# 4️⃣ Aplicar correcciones
data_corregida = corregir_texto(data)
print("Correcciones aplicadas")

# 5️⃣ Guardar nuevo JSON
with open(archivo_salida, "w", encoding="utf-8") as f:
    json.dump(data_corregida, f, ensure_ascii=False, indent=4)

print("Archivo creado en:", archivo_salida)
print("Proceso terminado correctamente")
