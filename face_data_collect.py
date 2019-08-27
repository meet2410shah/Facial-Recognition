# -*- coding: utf-8 -*-
"""
Created on Sun Aug  4 18:21:34 2019

@author: Rahil
"""

import cv2
import os
import numpy as np
import matplotlib.pyplot as plt
import glob

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_alt.xml")
dataset_path='./data/'
file_name='xyz'
count=0
cv_img = []
for img in glob.glob("./sample/*.jpg"):
    frame= cv2.imread(img)
    face_data=[]
    gray_frame = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(frame,1.3,5)
    faces = sorted(faces,key=lambda f:f[2]*f[3])
    for face in faces[-1:]:
        x,y,w,h=face
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2)
        offset = 10
        face_section = frame[y-offset:y+h+offset,x-offset:x+w+offset]
        face_section = cv2.resize(face_section,(100,100))
        face_data.append(face_section)
    face_data = np.asarray(face_data)
    if(face_data.shape[0]!=0):
        face_data = face_data.reshape((face_data.shape[0],-1))
        file_name2=file_name+str(count)
        count+=1
        np.save(dataset_path+file_name2+'.npy',face_data)