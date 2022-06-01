import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import { Controller } from 'react-hook-form'


export const Keywords = ({
    control,
    defaultKeywords = []
}) => {

    const [keyword, setKeyword] = useState("")
    const [keywords, setKeywords] = useState(defaultKeywords)

    const removeKeyword = (idx) => {
        setKeywords(keywords.filter((_, id) => id !== idx));
    }

    const handleAddKeyword = (e, onChange) => {
        if (e.charCode === 13) { // On key enter
            e.preventDefault();
            setKeywords([...keywords, keyword]);
            onChange([...keywords, keyword])
            setKeyword("")
        }
    }

    return (
        <Row className="mt-2 mb-2">
            <Col sm={12}>
                <Form.Label>Keywords</Form.Label>
            </Col>
            <Col sm={8}>
                <Controller
                    control={control}
                    name="keyword"
                    render={({ field: { onChange, ref } }) => (
                    <Form.Control
                        type="text"
                        name="keywords"
                        maxLength="12"
                        placeholder="Insert a keyword"
                        onChange={(e) => {
                            setKeyword(e.target.value);
                        }}
                        ref={ref}
                        value={keyword}
                        onKeyPress={(e) => {handleAddKeyword(e, onChange)}}
                    />)}
                />
                
            </Col>
            <Col sm={12} className='p-2'>
                {
                    keywords.map((keyword, idx) =>
                        <Badge key={idx} variant="primary">
                            <span className="cursor-pointer" onClick={() => removeKeyword(idx)}>X</span>
                            <span className="ml-2">{keyword}</span>
                        </Badge>
                    )
                }
            </Col>
        </Row>
    )
}
