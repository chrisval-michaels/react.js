
import { Form, useActionData, redirect, type ActionFunctionArgs } from "react-router";
import { createJoke } from "../jokes.server";

type ActionError = {
  formError?: string;
  fieldErrors?: {
    name?: string;
    content?: string;
  };
  fields?: {
    name: string;
    content: string;
  };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "");
  const content = String(formData.get("content") ?? "");

  const fieldErrors: { name?: string; content?: string } = {};
  if (name.length < 3) fieldErrors.name = "Name must be at least 3 characters";
  if (content.length < 10) {
    fieldErrors.content = "Content must be at least 10 characters";
  }

  if (fieldErrors.name || fieldErrors.content) {
    return Response.json<ActionError>(
      { fieldErrors, fields: { name, content } },
      { status: 400 }
    );
  }

  const joke = await createJoke(name, content);
  return redirect(`/jokes/${joke.id}`);
}

export default function NewJokeRoute() {
  const actionData = useActionData() as ActionError | undefined;

  const fields = actionData?.fields ?? { name: "", content: "" };
  const fieldErrors = actionData?.fieldErrors ?? {};

  return (
    <div className="card">
      <h2>Add a new joke</h2>

      <Form method="post" style={{ marginTop: "1rem" }}>
        <label>
          Name
          <input type="text" name="name" defaultValue={fields.name} />
          {fieldErrors.name ? (
            <div style={{ color: "#f97373", fontSize: "0.85rem" }}>
              {fieldErrors.name}
            </div>
          ) : null}
        </label>

        <label>
          Content
          <textarea name="content" defaultValue={fields.content} />
          {fieldErrors.content ? (
            <div style={{ color: "#f97373", fontSize: "0.85rem" }}>
              {fieldErrors.content}
            </div>
          ) : null}
        </label>

        <button type="submit">Add joke</button>
      </Form>
    </div>
  );
}
