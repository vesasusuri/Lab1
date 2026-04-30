import React from "react";
import "./aboutTeam.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RiArrowRightSFill } from "react-icons/ri";
import { PanelData, TabData } from "./data";

const AboutTeam = () => {
  const tabs = Array.isArray(TabData) ? TabData : [];
  const panels = Array.isArray(PanelData) ? PanelData : [];

  if (!tabs.length || !panels.length) {
    return <p>Team data is missing or wrong.</p>;
  }

  return (
    <div className="shared-top-academy-teachers" data-aos="fade-up">
      <Tabs  data-aos="fade-up">
        <TabList>
          {tabs.map((item, index) => (
            <Tab key={index}>
              <div className="line"></div>

              <div className="img-container">
                {item?.img && <img src={item.img} alt="" className="img" />}
              </div>

              <RiArrowRightSFill className="arrow" />
            </Tab>
          ))}
        </TabList>

        <div className="tab-panel">
          {panels.map((item, index) => (
            <TabPanel key={index}>
              <div className="inner-tab-panel flex-box">
                <div className="images">
                  {item?.bg && <img src={item.bg} alt="" className="bg" />}

                  <div className="circle"></div>

                  <div className="profile-container">
                    <div className="info">
                      {item?.img && (
                        <img
                          src={item.img}
                          alt={item?.name || ""}
                          className="profile"
                        />
                      )}

                      <h6>{item?.name || "No name"}</h6>
                      <p>{item?.occupation || "No occupation"}</p>
                    </div>
                  </div>
                </div>

                <div className="right-content">
                  <div className="inline inline1">
                    <div className="block">
                      <h6>{item?.name || "No name"}</h6>
                      
                      <p>{item?.occupation || "No occupation"}</p>
                    </div>
                  </div>

                  <div className="bio">
                    <h5 className="uppercase">About</h5>
                    <br></br>
                    <p>{item?.bio || "No bio available."}</p>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default AboutTeam;