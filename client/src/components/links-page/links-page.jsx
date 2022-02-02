import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { ApiRoute } from "../../const";
import { useHttp } from "../../hooks/use-Http";
import { createHeaders } from "../../utils/storage-utils";
import { Preloader } from "../preloader/preloader";


const OneLink = ({link, index}) => {

    const {click, from, to, _id} = link;

    return (
        <tr>
        <td>{index + 1}</td>
        <td>{from}</td>
        <td>{to}</td>
        <td><Link to={`/detail/${_id}`} className="btn waves-effect waves-light blue darken-2" rel="noopener noreferrer">
                Open<i className="material-icons right">send</i>
            </Link>
        </td>
        <td><a className="btn waves-effect waves-light" href={to} target="_blank" rel="noopener noreferrer">

                click</a>
        </td>


        <td>{click}</td>


      </tr>

    )
}


export const LinksPage = () => {

    const {request, loading} = useHttp();
    const [links, setLinks] = useState([]);

    const fetchLinks = useCallback(async () => {
        const serveLinks = await request(ApiRoute.Links, 'GET', null, createHeaders());
        setLinks(serveLinks.data.links);
    }, [request]) 

    useEffect(() => {fetchLinks()}, [fetchLinks])


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

    const linkList = links.map((item, i) => <OneLink link={item} index={i} key={item._id}/>)


    return (
    <>
        <h2> Links Count:  {links.length}</h2>
        <table>
        <thead>
          <tr>
              <th>Number</th>
              <th>Original</th>
              <th>Convert</th>
              <th>Open</th>
              <th>Click</th>
              <th>Clicks</th>
          </tr>
        </thead>

        <tbody>

            {linkList}

        </tbody>
      </table>
        </>
    )
}
 