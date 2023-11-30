import React, { useState } from "react";
import Image from "next/image";
import { saveAs } from "file-saver";

// INTERNAL IMPORT
import Style from "./Product.module.css";
import BTNStyle from "../Button/Button.module.css";
import images from "../Image/index";
import client from "../Image/client/index";
import { Donate, Logo } from "../index";

const Product = ({
    setNotification,
    setSupport,
    donateAmount,
    setLoading,
    image,
}) => {
    const handleClick = () => {
        let url = `${image?.imageURL}`;
        saveAs(url, `${image?.title}`);
    };

    const [donate, setDonate] = useState(false);

    //if (!image) return <Logo />;
    console.log("====>", image);

    return (
        <div className={Style.Product}>
            <div className={Style.image}>
                <img
                    className={Style.image_img}
                    src={image?.imageURL}
                    alt="image"
                />
            </div>
            <div className={Style.detail}>
                <div className={Style.detail_box}>
                    <h1>{image?.title}</h1>
                    <p>{image?.description}</p>

                    <p className={Style.info}>
                        <span>Category: {image?.category}</span>{" "}
                        <span>Image ID: {image?.imageId}</span>{" "}
                        <span>
                            CreatedAt:{" "}
                            {new Date(image?.createdAt * 1000).toDateString()}
                        </span>
                    </p>

                    <p className={Style.info}>
                        <span>
                            Donation:{""} {image?.fundRaised ?? 0} MATIC
                        </span>{" "}
                        {""}{" "}
                    </p>

                    <p>Contact Creator: {image?.email}</p>
                    <span className={Style.para}>
                        <Image
                            className="avatar_img"
                            src={client[`client${1}`]}
                            width={40}
                            height={40}
                        />

                        <small
                            className={Style.para_small}
                            onClick={() => (
                                setNotification("Successfully copied"),
                                navigator.clipboard.writeText(image?.creator)
                            )}
                        >
                            {image?.creator?.slice(0, 30)}..
                        </small>
                    </span>
                </div>

                <button
                    onClick={() => (
                        setNotification("Image URL is Successfully copied"),
                        navigator.clipboard.writeText(image?.imageURL)
                    )}
                    class={BTNStyle.button}
                >
                    <span class={`${BTNStyle.button_content} ${Style.btn}`}>
                        Copy URL{" "}
                    </span>
                </button>

                {/* DOWNLOAD */}
                <span className={Style.space}></span>
                <button
                    onClick={() =>
                        navigator.clipboard.writeText(
                            setNotification("Thanks for dowloading")
                        )
                    }
                    class={BTNStyle.button}
                >
                    <span
                        onClick={handleClick}
                        class={`${BTNStyle.button_content} ${Style.btn}`}
                    >
                        Download Image{" "}
                    </span>
                </button>

                {/* DONATE */}
                <span className={Style.space}></span>
                <button onClick={() => setDonate(true)} class={BTNStyle.button}>
                    <span class={`${BTNStyle.button_content} ${Style.btn}`}>
                        Donate
                    </span>
                </button>
            </div>
            {donate && (
                <div className="form">
                    <div className="form_inner">
                        <Donate
                            setLoading={setLoading}
                            donateAmount={donateAmount}
                            setDonate={setDonate}
                            setSupport={setSupport}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;