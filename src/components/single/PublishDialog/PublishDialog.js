import Dialog from "@material-ui/core/Dialog";
import React, {useEffect, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChoiceSelect from "../ChoiceSelect/ChoiceSelect";


const BoolField = ({param, value, label}) => {

    const [checked, setChecked] = useState(value);

    return (
        <Switch color="primary" checked={checked} onChange={() => setChecked(!checked)}/>
    );

};

const Publisher = () => {

    const [publisher, setPublisher] = useState('sphinx');
    const [fetched, setFetched] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [fields, setFields] = useState([]);

    const fetchFields = () => {
        fetch(`//localhost:8000/publish/${publisher}/fields`)
            .catch(e => {
                console.error(e)
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setFields(data.fields);
                    setFetched(true);
                }
            });
    };

    const componentDidMount = () => {
        fetchFields();
    };

    const renderField = ({type, value, label, param, choices = []}) => {

        let component;
        switch (type) {
            case "str":
                component = <TextField name={param} style={{margin: '0 1em', width: '100%'}}
                                       placeholder={value}>{value}</TextField>
                break;
            case "bool":
                component = <BoolField name={param} style={{margin: '0 1em'}} value={value} param={param}/>
                break;
            case "select":
                component = <ChoiceSelect
                    name={param} style={{margin: '0 1em'}}
                    value={value}
                    id={param}
                    choices={choices}
                    onChoiceChanged={(v) => console.log(v)}
                />
                break;
            default:
                component = <></>;
        }

        return <Box margin={'.5em 0'} display={'flex'} justifyItems={'right'}>
            <FormControlLabel
                style={{width: '100%'}}
                id={param}
                // value={value}
                control={component}
                label={label}
                labelPlacement="start"
            />
        </Box>;
    };

    const handleSubmit = (val) => {
        console.log("submit", val);
        setSubmit(true);
    };

    useEffect(componentDidMount);

    return (
        <Box style={{display: 'flex', flexDirection: 'column', margin: 'auto'}}>
            <Box margin={'1em'}>
                <ChoiceSelect
                    label={"Publisher"}
                    value={publisher}
                    onChoiceChanged={(val) => setPublisher(val)}
                    choices={[
                        {label: "Sphinx", value: "sphinx"},
                        {label: "Doxygen", value: "doxygen"}
                    ]}/>
            </Box>
            <Box margin={'1em auto'}>
                <Box display={'flex'} flexDirection={'column'}>
                    {fetched ? fields.map(field => renderField(field)) : <CircularProgress variant={'indeterminate'}/>}
                </Box>
            </Box>
        </Box>

    );

};


const PublishDialog = ({show, document, onDocumentPublished}) => {

    const [open, setOpen] = useState(show);
    const [publish, setPublish] = useState(false);

    const handleClose = () => setOpen(!open);

    const handlePublish = (val) => {
        setPublish(true);
        console.log("form submit", val);
        onDocumentPublished();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}>
            <form>
                <DialogTitle>Publishing document {document.name}</DialogTitle>
                <DialogContent>
                    <Publisher/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={publish} type={"submit"} onClick={handlePublish} color="primary" autoFocus>
                        Publish
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );

};

export default PublishDialog;