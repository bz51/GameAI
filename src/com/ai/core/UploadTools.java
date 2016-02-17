package com.ai.core;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;

import org.apache.struts2.ServletActionContext;

public class UploadTools {
	public static String upload(File file){
		//基于myFile创建一个文件输入流  
        InputStream is;
		try {
			is = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		}  
          
        // 设置上传文件目录  
//        String uploadPath = Parameter.UploadPath_abs;
        String uploadPath = ServletActionContext.getServletContext().getRealPath("/upload");
        File uploadPathDir  = new File(uploadPath);
        if(!uploadPathDir.exists()){
        	uploadPathDir.mkdirs();
        }
        System.out.println("上传目录为："+uploadPath);
        // 设置目标文件
//        System.out.println("filename:"+fileFileName);
//        System.out.println("fileContentType:"+fileContentType);
        //生成新的文件名，防止服务器中文件名重复
        String fileFileName = new Date().getTime()+"";
        File toFile = new File(uploadPath, fileFileName);  
        if(!toFile.exists()){
        	try {
				toFile.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
        }
        
        // 创建一个输出流  
        OutputStream os;
		try {
			os = new FileOutputStream(toFile);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		}
  
        //设置缓存  
        byte[] buffer = new byte[1024];  
  
        int length = 0;  
  
        //读取myFile文件输出到toFile文件中  
        try {
			while ((length = is.read(buffer)) > 0) {  
			    os.write(buffer, 0, length);  
			}
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}  
        //关闭输入流、输出流
        try {
			is.close();
	        os.close(); 
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}  
        
    	return toFile.getName();
	}
	
}
