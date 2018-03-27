package com.tensor;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.tensor.exceptions.VGSException;


@Component
public class BootStrapInitializer {
	private static final Logger LOGGER = LogManager.getLogger(BootStrapInitializer.class);



	/**
	 * @param ready
	 * @throws VGSException
	 */
	@EventListener
	public void onApplicationReady(ApplicationReadyEvent ready) throws VGSException {
			LOGGER.debug("Initializing Beam cache");
			/*emsCacherService.initializeBeamCache();
			emsCacherService.initializeCache();
			emsCacherService.initializePair();*/
	}
}
