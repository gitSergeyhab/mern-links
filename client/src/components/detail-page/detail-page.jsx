import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRoute } from "../../const";

import { useHttp } from '../../hooks/use-Http';
import { createHeaders } from "../../utils/storage-utils";
import { cutStr, getHumanDate } from "../../utils/utils";
import { Preloader } from "../preloader/preloader";


export const DetailPage = () => {

    const {id} = useParams();
    const {request, loading, error} = useHttp()

    const [link, setLink] = useState(null);


    useEffect(async() => {
        const data = await request(`${ApiRoute.Links}/${id}`, 'GET', null, createHeaders());
        setLink(data.link)
    }, [id])


    if (loading) {
        return <Preloader/>
    }

    if (error || !link) {
        return <div><h2> Somethin is wrong</h2></div>
    }

    const {click, code, date, from, to} = link;


    return (
    <div>
        <h2> Detail Link</h2>
        <div className="row">
    <div className="col s12 m12">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
            <h3><span className="card-title">CODE GENERATED :  {code}</span></h3>
          <p ><a href={from}><b>FROM: <br/> </b>{cutStr(from)}</a></p>
          <br/>
          <p><a className="white-text" href={to} target="_blank"><b>TO: <br/> </b> {to}</a></p>
          <br/>
          <p><b>CLICK COUNT: {click}</b></p>
          <br/>
          <p><b>{getHumanDate(date)}</b></p>

        </div>
      </div>
    </div>
  </div>


    </div>
    )
} 