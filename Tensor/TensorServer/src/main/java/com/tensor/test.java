package com.tensor;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;




class Counter {
    int count = 0;
    ExecutorService executorService = Executors.newFixedThreadPool(2);

   public String  test() throws InterruptedException, ExecutionException {
	  
	   
	   Future<String> future =  executorService.submit(() -> {
	        return "ankit";
	   });
	  
	  executorService.submit(()->{
		  for(int i=0;i<=10;i++) {
			  try {
				Thread.sleep(1000);
				System.out.println("hello");
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		  }
	  });
	  executorService.shutdown();
	  return  future.get();
}

}

public class test {

	public static void main(String[] args) throws InterruptedException, ExecutionException {
		  
	        Counter counter = new Counter();
	        String result= counter.test();
	        System.out.println("Output: "+result);
	     
	}

}
