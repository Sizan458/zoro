
import { useSnapshot } from "valtio";
import State from "../store";
import { AnimatePresence , motion } from "framer-motion";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {  ColorPicker, CustomButton, FilePicker } from "../components";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";

import { Tab } from "../components";
import { useState } from "react";
import { reader } from "../config/helpers";



const Customizer = () => {
  const snap = useSnapshot(State);
  const [file, setFile] = useState('');

  
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  // show tab depending on the active state
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
      
      default:
        return null;
    }
  }
//  handleSubmit


//  handleDecals
const handleDecals = (type, result) => {
  const decalType = DecalTypes[type];

  State[decalType.stateProperty] = result;

  if(!activeFilterTab[decalType.filterTab]) {
    handleActiveFilterTab(decalType.filterTab)
  }
}
// handleActiveFilterTab
const handleActiveFilterTab = (tabName) => {
  switch (tabName) {
    case "logoShirt":
        State.isLogoTexture = !activeFilterTab[tabName];
      break;
    case "stylishShirt":
        State.isFullTexture = !activeFilterTab[tabName];
      break;
    default:
      State.isLogoTexture = true;
      State.isFullTexture = false;
      break;
  }

  // after setting the state, activeFilterTab is updated

  setActiveFilterTab((prevState) => {
    return {
      ...prevState,
      [tabName]: !prevState[tabName]
    }
  })
}

//  read file

const readFile = (type) => {
  reader(file)
    .then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    })
}
  

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen ">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
               {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-5 right-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (State.intro = true)}
              CustomStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() =>handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
