import React from "react";
import * as logos from "../assets/images";

export default function About () {
	return (
		
		<section id="about">
		  <h3>Get to know who is <span className="get-to-know">Norbert!</span></h3>
		  <div className="about-me grid">
			<div className="reading">
			  <p className="about-me-paragraph">
				Hi! <br />
				My name is Nirugira M. Norbert,
				<span className="iamjunior">I am a Junior software developer.</span>
				Since my childhood, i have always been intrigued by being called a
				software developer. i started this by following computer Science
				in high school, and currently pursuing an ATLP to enhance my
				skills towards being successful in world class tech field. I am
				very enthusiastic person who is eager to always learn new things
				and who likes team work. besides being Tech passionate , i like
				exploring new places, and playing volleyball and guitar
				instrument. sounds weird how i am not any football club fan!
			  </p>
			</div>
			<div className="skills">
			  <div className="header">
				<h3>Tech <span className="stack">Stack</span></h3>
			  </div>
			  <div className="languages">
				<h4>languages</h4>
				<img
				  src={logos.JavaScript}
				  alt="js"
				  className="size-icons"
				/>
				<img src={logos.Php} alt="php" className="size-icons" />
			  </div>
			  <div className="others">
				<h4>others</h4>
				<img src={logos.Html} alt="html" className="size-icons" />
				<img
				  src={logos.Tailwind}
				  alt="tail"
				  className="size-icons"
				/>
			  </div>
			  <div className="tools">
				<h4>Tools</h4>
				<img src={logos.VSCode} alt="vs" className="size-icons" />
				<img
				  src={logos.Figma}
				  alt="Figma"
				  className="size-icons"
				/>
				<img src={logos.Git} alt="git" className="size-icons" />
			  </div>
			  <div className="database">
				<h4>Database</h4>
				<img
				  src={logos.Mongodb}
				  alt="mongo"
				  className="size-icons"
				/>
			  </div>
			</div>
		  </div>
		</section>
			
	)
}