// in src/posts.js
import * as React from "react";
import { useMediaQuery } from '@mui/material';
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    useRecordContext,
    ListButton,
    ShowButton,
    DeleteButton
} from 'react-admin';


const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput source="title" label="Ttile" reference="users">
        <SelectInput label="Title" optionText="title" />
    </ReferenceInput>,

];

export const PostList = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List filters={postFilters}>
            {isSmall ? (
                            <SimpleList
                                primaryText={record => record.title}
                                secondaryText={record => (
                                    <ReferenceField label="User" source="userId" reference="users">
                                        <TextField source="name" />
                                    </ReferenceField>
                                )}
                            />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="body" />
                    <ListButton />
                    <ShowButton basePath="/models" />
                    <EditButton />
                    <DeleteButton/>
                </Datagrid>
            )}
        </List>
    );
}

const PostTitle = () => {
        const record = useRecordContext();
        return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
        <Create {...props}>
            <SimpleForm>
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="title" />
                <TextInput multiline source="body" />
            </SimpleForm>
        </Create>
    );