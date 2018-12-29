<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
	  <div class="navbar-brand">
	    <div class="navbar-item">Oleg Nagornyy</div>

	    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	    </a>
	  </div>

	  <div id="navbarBasicExample" class="navbar-menu">
	    <div class="navbar-start">
	      <a class="navbar-item">
	        Home
	      </a>
	      <div class="navbar-item has-dropdown is-hoverable">
	        <a class="navbar-link">
	          Cources
	        </a>

	        <div class="navbar-dropdown">
	        	<nuxt-link class="navbar-item" to="/data-science" active-class="is-active">Data Science</nuxt-link>
		        <nuxt-link class="navbar-item" to="/intro2python" active-class="is-active">Introduction to Python</nuxt-link>
	        </div>
	      </div>
	      <a class="navbar-item">
	        About
	      </a>
	    </div>
	  </div>
	</nav>
</template>