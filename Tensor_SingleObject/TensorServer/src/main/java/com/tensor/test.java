package com.tensor;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;

public class test {

	public static void main(String[] args) {
		   Path basedir = FileSystems.getDefault().getPath("C://tutorial//tmp");
	        String tmp_file_prefix = "Swing_";
	        String tmp_file_sufix=".txt";

	        //get the default temporary folders path
	        String default_tmp = System.getProperty("java.io.tmpdir");
	        System.out.println(default_tmp);

	        try {
	            //create a tmp file in a the base dir
	            Path tmp_3 = Files.createTempFile(basedir, tmp_file_prefix, tmp_file_sufix);
	            System.out.println("TMP: " + tmp_3.toString());

	        } catch (IOException e) {
	            System.err.println(e);
	        }

	}

}
