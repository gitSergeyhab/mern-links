import { useEffect, useState } from "react";
import { ApiRoute } from "../../const";
import { useHttp } from "../../hooks/use-Http";
import { createHeaders } from "../../utils/storage-utils";
import { cutStr, getHumanDate } from "../../utils/utils";
import { Preloader } from "../preloader/preloader";

const OneLink = ({link}) => {

    const {code, date, from, to} = link;

    return (
        <div className="row">
        <div className="col s12 m12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <p ><a href={from}><b>FROM: </b>{cutStr(from)}</a></p>
              <p><a className="white-text" href={to} target="_blank"><b>TO: </b> {to}</a></p>
              <p><b>{getHumanDate(date)}</b></p>
            </div>
          </div>
        </div>
      </div>
    )
}


export const LinksPage = () => {

    const {request, loading} = useHttp();
    const [links, setLinks] = useState([]);



    useEffect(async() => {
        const servrLinks = await request(ApiRoute.Links, 'GET', null, createHeaders());
        console.log(links)
        setLinks(servrLinks.data.links)
    }, [request])

    console.log(links)


    if (loading) {
        return <Preloader/>
    }

    if (!links.length) {
        return (
            <div className="row">
                <div className="col s12 m12">
                There are not created links by you
                </div>
            </div>
        )
    }

    const linkList = links.map((item) => <OneLink link={item} key={item._id}/>)


    return (
    <>
        <h2> Links Count:  {links.length}</h2>
        <div className="row">
            <div className="col s12 m12">
                {linkList}
            </div>
        </div>
        </>
    )
}
 