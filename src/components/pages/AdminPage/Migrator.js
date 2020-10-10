import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

export const Migrator = ({title, onMigrateClick}) =>
    <Box style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignContent: 'space-between',
        padding: '.5em'
    }}>

        <form style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
            <TextField label={`Url to ${title} instance`} type={'url'} variant="outlined"/>
            <TextField label={`${title} login`} variant="outlined"/>
            <TextField label={`${title} password`} type={'password'} variant="outlined"/>
            <Button onClick={onMigrateClick} style={{width: 'auto', margin: '0 auto'}} color={'inherit'}>Migrate data
                from {title}</Button>
        </form>
    </Box>;