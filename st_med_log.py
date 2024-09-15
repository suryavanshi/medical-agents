
import os
import json
import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
st.title("Medical Log")



def get_gemini_json(file_content, mime_type, file_name):
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    # file_object = genai.types.FileObject(
    #     mime_type=mime_type,
    #     data=file_content
    # )
    result = model.generate_content(
        [file_name, "\n\n", "Extract all info from the chart and return as json"],
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json"
        )
    )
    # prompt = "Extract all info from the uploaded file and return as JSON"
    # result = model.generate_content(
    #     [file_object, prompt],
    #     generation_config=genai.GenerationConfig(
    #         temperature=0.1,
    #         response_mime_type="application/json"
    #     )
    # )
    print(f"{result.text=}")
    return result.text

uploaded_file = st.file_uploader("Choose a file")
st.write("uploaded file:",uploaded_file)
file_contents = uploaded_file.read()
file_type = uploaded_file.type
file_name = uploaded_file.name
photo_json = get_gemini_json(file_contents, file_type, file_name)
st.write("Res:",photo_json)