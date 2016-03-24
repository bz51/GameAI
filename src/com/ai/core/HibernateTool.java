package com.ai.core;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;

public class HibernateTool {
	private static final SessionFactory sessionFactory;
	private static AnnotationConfiguration configuration = new AnnotationConfiguration();
	
	static{
		configuration.configure("/hibernate.cfg.xml");  
        sessionFactory = configuration.buildSessionFactory();
	}
	
	public static SessionFactory getSessionFactory(){
		return sessionFactory;
	}
}
