import React from 'react';
import { Link } from 'react-router-dom';

const SearchDocItem = (props) => {
    return (
        <div className='searchdocitem_component'>
            <div className="date_source_docs_div">
                <p className='doc_item_date_sign'>{props.date}</p>
                <p className='doc_item_source_sign'>{props.source}</p>
            </div>
            <div className="title_spec_doc_div">
                <h1 className='doc_item_title'>{props.title}</h1>
                <p className='doc_tag_sign' style={{opacity: props.tag? "1" : "0"}}>{props.tag}</p>
            </div>
                {props.img?  <div className="doc_item_img"><img src={props.img}/></div> : null}
            <div className="docitem_text_div">
                <p>{props.text}</p>
            </div>
            <div className="docitem_footer_div">
                <Link to={props.url}><button className='doc_item_source_button'>Читать в источнике</button></Link>
                <p><span>{props.wordCount}</span> слов(а)</p>
            </div>
        </div>
    );
}

export default SearchDocItem;
