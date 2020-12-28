import React from 'react'


export default [
    {
      title: "Integration",
      label: "Skapa en integration",
      tools: {
        play: true
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M13 9h8L11 24v-9H4l9-15v9zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11z" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" fillRule="evenodd" d="M16.168 2.924L4.51 13.061a.25.25 0 00.164.439h5.45a.75.75 0 01.692 1.041l-2.559 6.066 11.215-9.668a.25.25 0 00-.164-.439H14a.75.75 0 01-.687-1.05l2.855-6.526zm-.452-1.595a1.341 1.341 0 012.109 1.55L15.147 9h4.161c1.623 0 2.372 2.016 1.143 3.075L8.102 22.721a1.149 1.149 0 01-1.81-1.317L8.996 15H4.674c-1.619 0-2.37-2.008-1.148-3.07l12.19-10.6z"></path></svg>
      ),
      // <BoltIcon />,
      // 
      // 
  
      theme: "#7f3bff",
      extra: null,
  
      ports: [
        { input: { name: "in", label: "Inmatning", color: "#616161", gate: true }, output: { name: "out", label: "Resultat", color: "#36bf16" } },
        { output: { name: "error", label: "Felhantering", color: "#ff7e7e" } },
      ]
    },
  
    {
      title: "Konjunktion",
      label: "Samordna flera led",
      minimized: true,
      // tools: {
      //   play: true
      // },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M7.105 8.79A3.001 3.001 0 0 0 10 11h4a5.001 5.001 0 0 1 4.927 4.146A3.001 3.001 0 0 1 18 21a3 3 0 0 1-1.105-5.79A3.001 3.001 0 0 0 14 13h-4a4.978 4.978 0 0 1-3-1v3.17a3.001 3.001 0 1 1-2 0V8.83a3.001 3.001 0 1 1 2.105-.04zM6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm12 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>
        /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fillRule="evenodd" fill="currentColor" d="M20 5.5a3.5 3.5 0 01-6.062 2.385l-5.112 3.021a3.497 3.497 0 010 2.188l5.112 3.021a3.5 3.5 0 11-.764 1.29l-5.112-3.02a3.5 3.5 0 110-4.77l5.112-3.021v.001A3.5 3.5 0 1120 5.5zm-1.5 0a2 2 0 11-4 0 2 2 0 014 0zM5.5 14a2 2 0 100-4 2 2 0 000 4zm13 4.5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> */
      ),
      // <GitPullIcon />, 
      theme: "#353535",
      disable: true,
      ports: [
        { input: { name: "in", label: "Inmatning", color: "#616161" }, output: { name: "out", label: "Resultat", color: "#36bf16" } },
        // { output: { name: "error", label: "Felhantering", color: "#ff7e7e" } },
      ]
    },
    {
      title: "Omvandlare",
      label: "Tolka och omvanda data",
      tools: {
        play: false
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M8 20v1.932a.5.5 0 0 1-.82.385l-4.12-3.433A.5.5 0 0 1 3.382 18H18a2 2 0 0 0 2-2V8h2v8a4 4 0 0 1-4 4H8zm8-16V2.068a.5.5 0 0 1 .82-.385l4.12 3.433a.5.5 0 0 1-.321.884H6a2 2 0 0 0-2 2v8H2V8a4 4 0 0 1 4-4h10z" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" fillRule="evenodd" d="M19.75 17.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm-3.25 1.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0z"></path><path fill="currentColor" fillRule="evenodd" d="M13.905 1.72a.75.75 0 010 1.06L12.685 4h4.065a3.75 3.75 0 013.75 3.75v8.75a.75.75 0 01-1.5 0V7.75a2.25 2.25 0 00-2.25-2.25h-4.064l1.22 1.22a.75.75 0 01-1.061 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0zM4.25 6.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM7.5 4.75a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0z"></path><path fill="currentColor" fillRule="evenodd" d="M10.095 22.28a.75.75 0 010-1.06l1.22-1.22H7.25a3.75 3.75 0 01-3.75-3.75V7.5a.75.75 0 011.5 0v8.75a2.25 2.25 0 002.25 2.25h4.064l-1.22-1.22a.75.75 0 111.061-1.06l2.5 2.5a.75.75 0 010 1.06l-2.5 2.5a.75.75 0 01-1.06 0z"></path></svg>
      ),
  
      // <ParserIcon />, 
      theme: "#8bc34a", //#ffc107
      disable: true,
      ports: [
        { input: { name: "in", label: "Inmatning", color: "#ffc107" }, output: { name: "out", label: "Resultat", color: "#36bf16" } },
        { output: { name: "error", label: "Felhantering", color: "#ff7e7e" } },
      ]
    },
    {
      title: "Variabel",
      label: "Hantera variabler",
      minimized: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47-1.667 1.647-2.933 2.47-3.8 2.47 3.995-7 1.8-10-4.2-14 .5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23zm.71-17.765c3.241 2.75 3.257 4.887.753 9.274-.761 1.333.202 2.991 1.737 2.991.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71.424-.38.773-.717 1.118-1.086 1.23-1.318 2.114-2.78 2.566-4.462z" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fillRule="evenodd" fill="currentColor" d="M12.185 21.5c4.059 0 7.065-2.84 7.065-6.75 0-2.337-1.093-3.489-2.678-5.158l-.021-.023c-1.44-1.517-3.139-3.351-3.649-6.557a6.14 6.14 0 00-1.911 1.76c-.787 1.144-1.147 2.633-.216 4.495.603 1.205.777 2.74-.277 3.794-.657.657-1.762 1.1-2.956.586-.752-.324-1.353-.955-1.838-1.79-.567.706-.954 1.74-.954 2.893 0 3.847 3.288 6.75 7.435 6.75zm2.08-19.873c-.017-.345-.296-.625-.632-.543-2.337.575-6.605 4.042-4.2 8.854.474.946.392 1.675.004 2.062-.64.64-1.874.684-2.875-1.815-.131-.327-.498-.509-.803-.334-1.547.888-2.509 2.86-2.509 4.899 0 4.829 4.122 8.25 8.935 8.25 4.812 0 8.565-3.438 8.565-8.25 0-2.939-1.466-4.482-3.006-6.102-1.61-1.694-3.479-3.476-3.479-7.021z"></path></svg> 
      ),
      theme: "#ff510b",
      disable: true,
      ports: [
        { output: { name: "out", label: "", color: "#616161" } }
        // { input: { name: "in", label: "URL", color: "#616161" } },
        // { input: { name: "in", label: "Namn", color: "#616161" } },
        // { input: { name: "in", label: "Kollektion", color: "#616161" },  output: { name: "out", label: "Resultat", color: "#36bf16" } },
        // { input: { name: "in", label: "Query", color: "#616161" }, output: { name: "error", label: "Felhantering", color: "#ff7e7e" }},
      ]
    },
  
    {
      title: "Databas",
      label: "CRUD mot MongoDB",
      tools: {
        play: true
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M5 12.5c0 .313.461.858 1.53 1.393C7.914 14.585 9.877 15 12 15c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171C17.35 11.349 14.827 12 12 12s-5.35-.652-7-1.671V12.5zm14 2.829C17.35 16.349 14.827 17 12 17s-5.35-.652-7-1.671V17.5c0 .313.461.858 1.53 1.393C7.914 19.585 9.877 20 12 20c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171zM3 17.5v-10C3 5.015 7.03 3 12 3s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5zm9-7.5c2.123 0 4.086-.415 5.47-1.107C18.539 8.358 19 7.813 19 7.5c0-.313-.461-.858-1.53-1.393C16.086 5.415 14.123 5 12 5c-2.123 0-4.086.415-5.47 1.107C5.461 6.642 5 7.187 5 7.5c0 .313.461.858 1.53 1.393C7.914 9.585 9.877 10 12 10z" /></svg>
      ),
      // <DatabaseIcon />, 
      theme: "#0382f4",
      disable: true,
      ports: [
        { input: { name: "in", label: "URL", color: "#616161" } },
        { input: { name: "test", label: "Namn", color: "#616161" } },
        { input: { name: "test1", label: "Kollektion", color: "#616161" }, output: { name: "out", label: "Resultat", color: "#36bf16" } },
        { input: { name: "test2", label: "Query", color: "#616161" }, output: { name: "error", label: "Felhantering", color: "#ff7e7e" } },
      ]
    },
  
  
  
    {
      title: "Vänta",
      label: "Vänta x sekunder",
      minimized: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill={"currentColor"} d="M17.618 5.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-1.414-1.414zM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM11 8h2v6h-2V8zM8 1h8v2H8V1z" /></svg>
      ),
      theme: "#f70054",
      disable: true,
      ports: [
        { input: { name: "in", label: "", color: "#616161" }, output: { name: "out", label: "", color: "#616161" } },
      ]
    },
    {
      title: "Script",
      label: "Koda själv",
      minimized: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill={"currentColor"} d="M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16-3.7V18a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5z" /></svg>
      ),
      // theme: "#7f3bff", 
      theme: "#ff9800",
      disable: true,
      ports: [
        { input: { name: "in", label: "", color: "#616161" }, output: { name: "out", label: "", color: "#616161" } },
      ]
    },
    {
      title: "Intervall",
      label: "",
      minimized: true,
      icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z" /><path fill={"currentColor"} d="M9 7.539L15 21.539 18.659 13 23 13 23 11 17.341 11 15 16.461 9 2.461 5.341 11 1 11 1 13 6.659 13z" /></svg>),
      theme: "#d700ef",
      disable: true,
      ports: [
        { output: { name: "out", label: "", color: "#616161" } },
      ]
    },
    {
      title: "Felhantering",
      label: "Hantera fel",
      minimized: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zm-8.66 16h15.588L12 5.5 4.206 19zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M13 15.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"></path><path fill="currentColor" fillRule="evenodd" d="M11.46.637a1.75 1.75 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.77 10.705-9.401 12.83a1.699 1.699 0 01-1.198 0C5.771 20.704 2 16.19 2 10V4.976c0-.76.49-1.43 1.21-1.664L11.46.637zm.617 1.426a.25.25 0 00-.154 0L3.673 4.74a.249.249 0 00-.173.237V10c0 5.461 3.28 9.483 8.43 11.426a.2.2 0 00.14 0C17.22 19.483 20.5 15.46 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676z"></path></svg>
      ),
      // <DangerIcon />, 
      theme: "#ff5050",
      disable: true,
      ports: [
        { input: { name: "in", label: "Inmatning", color: "#616161" } },
      ]
    }
  
  ]