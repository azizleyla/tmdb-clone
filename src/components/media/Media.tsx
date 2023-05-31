import React, { useState } from "react";

const tabs = [
  {
    id: 0,
    label: "Most Popular",
    value: "popular",
  },
  {
    id: 1,
    label: "Videos",
    value: "videos",
  },
  {
    id: 2,
    label: "Backdrops",
    value: "backdrops",
  },
  {
    id: 3,
    label: "Posters",
    value: "posters",
  },
];

const Media = () => {
  const [activeTab, setActiveTab] = useState<string>();

  return (
    <section>
      <div className="text-white  flex w-full items-baseline">
        <h3 className="mr-12 text-xl">Media</h3>
        <ul className="flex text-sm gap-5">
          {tabs.map((tab) => (
            <li
              style={{
                borderBottom: `${
                  activeTab === tab.value
                    ? "4px solid #fff"
                    : "4px solid transparent"
                }`,
              }}
              onClick={() => setActiveTab(tab.value)}
              className="flex gap-1 items-center cursor-pointer pb-1"
            >
              {tab.label}
              <span>0</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Media;
