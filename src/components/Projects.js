import React from 'react';
import ProjectsData from '../utils/ProjectsData';

const projects = ProjectsData.map(project => {
  return (
    <div className="first-project" key={project.id}>
      <div className="title">
        <h4>{project.title}</h4>
        <a href={project.link}>
          <img src={project.source} alt="source codes" />
        </a>
      </div>
      <p>{project.description} <a href ={project.demo} className="style-link">here</a></p>
    </div>
  )
})

export default function Projects() {
  return (
    <section id="projects">
      <h3>My <span className="work">work</span></h3>
      {projects}
    </section>
  );
}

