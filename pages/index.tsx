import { useEffect, useState } from "react";
import Head from "next/head";
import { Stage, Layer } from "react-konva";
import { v4 as uuidv4 } from "uuid";

import { DrawObject } from "../types";
import Rectangle from "../components/Rectangle";
import Image from "../components/Image";
import styles from '../styles/ShirtComposition.module.css'

export default function Home() {
  const [drawObjects, setDrawObjects] = useState<DrawObject[]>([
    {
      id: uuidv4(),
      type: "rectangle",
      shapeProps: {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: "#50e3c2",
      },
    },
    {
      id: uuidv4(),
      type: "image",
      imageUrl: "/vercel.svg",
      shapeProps: {
        x: 60,
        y: 180,
        width: 141.5,
        height: 32,
      },
    },
  ]);
  const [selectedId, setSelectedId] = useState<string>("");

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative p-4">
        <Stage
          width={300}
          height={400}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          className={`absolute border border-solid border-blue-300 background-image ${styles.canvasArea}`}
        >
          <Layer>
            {drawObjects.map((drawObject, i) => {
              if (drawObject.type === "rectangle") {
                return (
                  <Rectangle
                    key={drawObject.id}
                    shapeProps={drawObject.shapeProps}
                    isSelected={drawObject.id === selectedId}
                    onSelect={() => {
                      setSelectedId(drawObject.id);
                    }}
                    onShapePropsChange={(newAttrs) => {
                      const objects = drawObjects.slice();
                      objects[i].shapeProps = newAttrs;
                      setDrawObjects(objects);
                    }}
                  />
                );
              } else if (drawObject.type === "image") {
                return (
                  <Image
                    key={drawObject.id}
                    shapeProps={drawObject.shapeProps}
                    isSelected={drawObject.id === selectedId}
                    onSelect={() => {
                      setSelectedId(drawObject.id);
                    }}
                    onShapePropsChange={(newAttrs) => {
                      const objects = drawObjects.slice();
                      objects[i].shapeProps = newAttrs;
                      setDrawObjects(objects);
                    }}
                    imageUrl={drawObject.imageUrl}
                  />
                );
              }
            })}
          </Layer>
        </Stage>
      </main>

      <footer>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a> */}
      </footer>
    </div>
  );
}
