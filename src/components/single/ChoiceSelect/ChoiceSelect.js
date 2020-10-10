import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ChoiceSelect = ({onChoiceChanged, label, value, choices}) => {

    const [choiceValue, setValue] = useState(value);

    const handleChoiceChanged = (event) => {
        setValue(event.target.value);
        onChoiceChanged(event.target.value);
    };

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select
                value={choiceValue}
                onChange={handleChoiceChanged}
                label={label}>
                {choices.map((choice, idx) => <MenuItem key={idx} value={choice.value}>{choice.label}</MenuItem>)}
            </Select>
        </FormControl>
    );
};

export default ChoiceSelect;