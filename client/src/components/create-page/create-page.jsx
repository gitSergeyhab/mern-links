import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ApiRoute } from "../../const";

import { useHttp } from "../../hooks/use-Http"
import { createHeaders } from "../../utils/storage-utils";

export const CreatePage = () => {

    const navigate = useNavigate()
    const {request} = useHttp();

    const [link, setLink] = useState('');


    const handleEnterPress = async(evt) => {
        if (evt.key === 'Enter') {
            console.log('link', link)

            try {
                const data = await request(`${ApiRoute.GenerateLink}`, 'POST', {from: link}, createHeaders())
                console.log(data);
                navigate(`/detail/${data.link._id}`)
            } catch (e) { console.log(e)}
            
        }
    }


    return (<>
        <h2> Create Short Link</h2>
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={handleEnterPress}
                        value={link}
                        placeholder="link" name="link" id="link" type="text"
                        />
                    <label htmlFor="link">link</label>
                </div>
            </div>

        </div>
        </>
    )
} 