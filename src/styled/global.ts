import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;

}



html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: normal;
  font-style: normal;
  font-family: ${({ theme }) => theme.font};
  background: ${({ theme }) => theme.colors.background};
  
  color: ${({ theme }) => theme.colors.dark};
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: auto !important;

}

* {
  scrollbar-width: thin;
  scrollbar-color: 'red black';
}
*:focus{
  outline: none;
}

*::-webkit-scrollbar {
  height: 0.4rem; 
  width: 0.4rem;
  border-radius: 50rem;
}

*::-webkit-scrollbar-track {
  background: #eee;
}

*::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 50rem;
  border: 3px solid #ddd;
}

.secondary-scrollbar::-webkit-scrollbar{
  width: 0.2rem;
  height: 0.2rem;
}
.secondary-scrollbar::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.shades.primary[500]};
  border: 3px solid ${({ theme }) => theme.shades.primary[500]};
}

.disable-scrollbars::-webkit-scrollbar {
  background: transparent; /* Chrome/Safari/Webkit */
  width: 0px;
  display: none;

}
    
.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
}

*,
::after,
::before {
  box-sizing: border-box !important;
}
  

#root{
  width: 100%;
height: 100%;
margin: 0;
padding: 0;
box-sizing: border-box;
display: flex;
flex-direction: column;
overflow-x: hidden;
}
main {
display: flex;
flex-direction: column;
flex-grow: 1;
padding: 0;
}

p, span, a , button, li, b{
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.shades.dark[900]};
  font-size: inherit;
  font-weight: inherit;
}
p{
  font-size: 0.875rem;
}
b{
  font-weight: 600;
}

label {
    display: block;
    padding: 0.5em;
    font-size: 0.8rem;
  }
a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

ul{
list-style: none;
}
h1, h2, h3 , h4 , h4{
  letter-spacing: 1.2px;
  margin: 0;
  padding: 0;
}

button {
  appearance: none;
  cursor: pointer;
  border: none;
  padding: 0.5em;
  border-radius: 0.5em;
  font-family: ${({ theme }) => theme.font};
&:disabled{
  pointer-events: none;
  opacity: 0.5;
}
}
hr{
  border: 0.5px solid ${({ theme }) => theme.shades.dark[200]};
}

input{
  appearance: none;
  padding:  0.5em;
  border: 1.5px solid ${({ theme }) => theme.shades.dark[100]};
  outline: none;
  width: 100%;
  min-width: 150px;
  border-radius: 6px;
  height: 35px;
  background-color: transparent;
}
input::placeholder{
  color: ${({ theme }) => theme.shades.dark[500]};
}
input, button,input::placeholder{
  font-size: 0.875rem;
}
img{
  border-radius: inherit;
}
input.has_error{
  background: ${({ theme }) => theme.shades.danger[200]};;
}
.error-message {
    color: red;
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 0.3em;
  }



/* Toaster */

.toaster{
  font-size: 0.875rem;
  font-weight: 450;
  color: ${({ theme }) => theme.colors.dark};
}

/* Colors */
.color-primary{
  color:${({ theme }) => theme.colors.primary};
}


/* Background Colors */

.bg-white{
background-color: ${({ theme }) => theme.colors.white};
}

.bg-lgrey{
  background-color: ${({ theme }) => theme.shades.background[700]};
  border: 1px solid ${({ theme }) => theme.colors.background};
  }

  .bg-light{
    background-color: ${({ theme }) => theme.shades.dark[50]};

  }

/* ScrollBar */

.hide-scrollbar{
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Text Truncate */

.truncate {
  width: 100%;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.clamp-1 {
  -webkit-line-clamp: 1;
}
.clamp-2 {
  -webkit-line-clamp: 2;
}
.clamp-3 {
  -webkit-line-clamp: 3;
}

/* Font Weights */
.bold {
font-weight: 600;
}

/* Flex */


  .flex{
    display: flex;
  }
  .flex-wrap{
    flex-wrap: wrap;
  }
  .flex-end{
    justify-content: flex-end;
  }
  .flex-center{
    justify-content: center;
    align-items: center;
  }

  .align-center {
    align-items: center;
  }

/* Text Weight */
.text-bold{
  font-weight: bold;
}
/* Text Alignment*/
.text-center{
  text-align: center;
}

/* Height */
.h-100{
  height: 100%;
}

/* Margins */
.m-0{
  margin: 0 !important;
}
.mb{
  margin-bottom: 0.5em;
}
.mb-1{
  margin-bottom: 1em;
}
.mb-2{
  margin-bottom: 1.5em;
}
.mb-3{
  margin-bottom: 2em;
}

/* Width */
.w-100{
  width: 100%;
}


/* Hover Effects */
.hover-color-primary:hover {
    color: ${({ theme }) => theme.colors.primary} !important;
    svg {
      fill: ${({ theme }) => theme.colors.primary} !important;
    }
  }

  .hover-color-danger:hover {
    color: ${({ theme }) => theme.colors.danger} !important; 
    svg {
      fill: ${({ theme }) => theme.colors.danger} !important;
    }
  }

/* Border */
.no-border{
  border: none !important;
}
.border-b {
  border-bottom: 1px solid ${({ theme }) => theme.shades.dark[100]};
}

/* Link */
.link {
  text-decoration: underline;
  &:hover{
    color: ${({ theme }) => theme.colors.primary};
  }
}


.primary-border-bottom{
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 500;
  svg {
        margin-right: 0.2em;
      }
  &:after {
    content: '';
    display: block;
    width: 0%;
    height: 2.5px;
    position: absolute;
    top: 120%;
    transition: ease-in-out 0.3s;
    background-color: ${({ theme }) => theme.shades.dark[50]};
    left: 0;
    right: 0;
    margin: auto;
    
    
  }
  &.active, &:hover {
      &::after {
        width: 100%;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }
   &.active{
    color: ${({ theme }) => theme.colors.primary};

    svg{
      fill: ${({ theme }) => theme.colors.primary};

    }
   } 
}


/* Shadows */
.shadow{
  box-shadow: ${({ theme }) => theme.shades.dark[100]} 3px 8px 10px 1px;
}


`
