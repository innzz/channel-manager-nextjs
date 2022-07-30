import Table from 'react-bootstrap/Table';
import React from "react"
import styles from "../../styles/Property.module.css";
import Container from 'react-bootstrap/Container';
import { BsSearch } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";

import { useState } from 'react';
function Property({ oldProperties,property }) {
    console.log(oldProperties.roomDtos)
    // console.log(property)
    const [shopModal, setshopModal] = useState(false);

    const handleShopModal = () => {
        setshopModal(!shopModal)
    }

    return (
        <Container>
            <Table bordered className={styles.container}>
                <thead className={styles.heading}>
                    <tr className={styles.heading}>
                        <th>Channel Manager Room Type</th>
                        <th>Channel Manager Room Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.heading}>
                        <td>
                            <button onClick={handleShopModal} className={styles.button}>All Room Types <AiFillCaretDown />
                                <div className={styles.shopModal} style={shopModal ? { display: 'block' } : { display: 'none' }}>
                                    <Link href={`${property}`}><li>All</li></Link>
                                    {oldProperties.roomDtos.map((val, i) => {
                                        return (
                                            <Link key={i} href={`${property}`}><li>{val.name}</li></Link>
                                        )
                                    })}
                                </div>
                            </button></td>
                        <td>
                            <div className={styles.inputContainer}>
                                <i className={styles.icon}><BsSearch className={styles.searchIcon} /></i>
                                <input className={styles.inputField} type="text" placeholder="Username" name="usrnm" />
                            </div>
                        </td>
                    </tr>
                    {oldProperties.roomDtos.map((val, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    {val.name}
                                </td>
                                <td>
                                    Plan Rooms
                                </td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td rowSpan={3}>
                            Double Room
                        </td>
                        <td className={styles.td}>
                            BAR
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>
                            Bed & Breakfast
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>
                            Weekend Special Deal
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={3}>
                            Twin Room
                        </td>
                        <td className={styles.td}>
                            BAR
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>
                            Stay 3 Pay 2
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.td}>
                            Honeymoon
                        </td>
                    </tr> */}
                </tbody>
            </Table>
        </Container>
    );
}

export default Property;


export async function getStaticPaths() {
    return {
        paths: [
            { params: { property: "237" } },
            { params: { property: "424" } },
            { params: { property: "368" } },
            { params: { property: "575" } },
            { params: { property: "578" } },
            { params: { property: "495" } },
            { params: { property: "424" } },
            { params: { property: "547" } },
        ],
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { property } = context.params;
    const propertiesResponse = await fetch(`https://api.bookonelocal.in/channel-integration/api/channelManager/property/${property}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib29rb25ldGVzdGJ1c2luZXNzQGdtYWlsLmNvbSIsInNjb3BlcyI6IlJPTEVfUFJPUF9BRE1JTiIsImlhdCI6MTY1ODg5Njk5OCwiZXhwIjoxNjU5MzI4OTk4fQ.yJpc1N9tn_q345k3hZHLapQaeXVO23xlWkbQwhPx7XI",
                "Content-Type": "application/x-www-form-urlencoded",
                APP_ID: "BOOKONE_WEB_APP",
            },
        });
    const oldProperties = await propertiesResponse.json();


    return { props: { oldProperties, property } };

}

