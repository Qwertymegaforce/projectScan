import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./static/styles/basic_styles.css";
import "./static/styles/basecomponents_styles.css";
import "./static/styles/homepage_styles.css";
import "./static/styles/register_styles.css";
import "./static/styles/search_styles.css";
import "./static/styles/searchresult_styles.css";



const root = document.getElementById('root');
const reactRoot = createRoot(root)

reactRoot.render(<App />)