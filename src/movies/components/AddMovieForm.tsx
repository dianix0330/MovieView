import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';

interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  // TODO: Implement form for adding a movie
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField name="Url" setter={setURL}/>
      <InputField name="Title" setter={setTitle}/>
      <InputField name="Subtitle" setter={setDescription}/>
      <InputField name="Description" setter={setSubtitle}/>
      <div className="text-center">
      <Button onClick={() => {
        onSubmit({
          imageUrl: url,
          title: title,
          subtitle: subtitle,
          description: description
        })
      }}>
        Submit
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
      </div>
    </form>
  );
}
