"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "@/ui/addImage/index.module.scss";
import Image from "next/image";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useEdgeStore } from "@/lib/edgestore";

type Props = {
  state: { success: string } | undefined;
};

const AddImage: FC<Props> = ({ state }) => {
  const [image, setImage] = useState("");
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    setImage("");
  }, [state?.success]);

  const handleAddImage = () => {
    const input: HTMLElement | null = document.querySelector("#imageInput");
    if (input) {
      input.click();
    }
  };

  return (
    <>
      {image ? (
        <div className={styles.imageWrapper}>
          <input type="hidden" name="image" value={image} />
          <Image
            className={styles.img}
            src={image}
            alt="banner"
            width={175}
            height={100}
          />
          <MdDeleteForever
            className={styles.delete}
            size={30}
            onClick={() => {
              setImage("");
            }}
          />
        </div>
      ) : (
        <label
          className={styles.addWrapper}
          htmlFor="image"
          onClick={handleAddImage}>
          <MdAddCircleOutline size={30} />
          <input
            className={styles.addInput}
            id="imageInput"
            type="file"
            name="image"
            onChange={async ({ target: { files } }) => {
              if (files) {
                const res = await edgestore.publicFiles.upload({
                  file: files[0],
                });
                setImage(res.url);
              }
            }}
            accept=".jpeg, .png"
          />
        </label>
      )}
    </>
  );
};

export default AddImage;
