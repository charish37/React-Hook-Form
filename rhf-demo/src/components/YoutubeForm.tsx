import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export default function YouubeForm() {
  const { 
    register, 
    control, 
    handleSubmit, 
    formState, 
    watch, 
    getValues,
    setValue,
    reset,
    trigger
  } =
    useForm<FormValues>({
      // defaultValues: {
      //   username: "batman",
      //   email: "",
      //   channel: ""
      // }
      defaultValues: async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        const data = await response.json();
        return {
          username: data.username,
          email: data.email,
          channel: "",
          social: {
            twitter: "",
            facebook: "",
          },
          phoneNumbers: ["", ""],
          phNumbers: [{ number: "" }],
          age: 0,
          dob: new Date(),
        };
      },
      mode: "onSubmit" // this says that to perform validations when submitted -- onBlur,onTouched,
    });

  renderCount++;

  // touched --> either if user interacted with component or not 
  // dirty --> either the original value updated or not --> if we update our value back to the default value dirty will be false.
  // we can access touchedfields and dirty fields from the form state

  // isValid --> says either form is valid or not i.e not errors
  // isSubmitting --> says the form is in submitting state or not

  const { errors, dirtyFields, touchedFields,isDirty,isValid, isSubmitting,isSubmitted,isSubmitSuccessful, submitCount } = formState;
  console.log("isSubmitting: ",isSubmitting, "isSubmitted: ", isSubmitted, "isSubmittedSuccessful: ", isSubmitSuccessful, "submitCount: ", submitCount);
  // console.log({touchedFields,dirtyFields,isDirty});

  // -----------handle submit ---------------

  const onSubmit = (data: FormValues) => console.log(data);

  // -----------dynamic fields ---------------

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  //-------------Watch -----------------------

  // the below one will watch the username
  // const watchUsername = watch("username");

  // the below one will watch both the username and email
  // const watchUsername = watch(["username","email"]);

  // if we wont provide any arguments then it will watch all the values
  // const watchUsername = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });
    // clean up function
    return () => subscription.unsubscribe();
  }, [watch]);

  //unlike watch, getvalues won't allow a component to rerender and it will be used to retrieve values by performing any actions like clicking
  const handleGetValues = () => {
    // console.log("Getting all values", getValues());
    // console.log("Get values of specific value", getValues("social"));
    // console.log(
    //   "Get values of specific values",
    //   getValues(["username", "social"])
    // );
  };

  const handleSetValues = () => {
    setValue("username",""); // here we are not updating dirty and touched
    setValue("email", "smith@abc.com",{
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    })
  }

  // this will be called if form submission fails due to errors
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors",errors);
  };

  useEffect(() => {
    if(isSubmitSuccessful) reset();
  },[isSubmitSuccessful,reset])



  return (
    <div className="form-control">
      <h1>Youtube form {renderCount / 2}</h1>

      {/* ---------watching values ---------- */}
      {/* <h2>Watched value: {JSON.stringify(watchUsername)}</h2> */}
      {/* <h2>Watched value: {watchUsername}</h2> */}

{/* we use the handlesubmit instead of directly passing onsubmit bcz handle submit has second parameter known as onError */}
      <form onSubmit={handleSubmit(onSubmit,onError)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>

          {/* -------------custom validation ----------- */}

        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter the correct email address",
              },

              // ------------ validating using callback function -----------

              // validate: (fieldValue) => {
              //   return (
              //     fieldValue !== "admin@example.com" || "Enter a different email address"
              //   )
              // }

              // ---------- validating using nexted fields ------------

              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter another email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                     const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                     const data = await response.json();
                     return data.length == 0 || "Email already exists";
                }
              },
            })}
          />
          <p className="error">{errors?.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel",{
            disabled : watch("email") === "",
            required: true
          })} />
          <p className="error">{errors?.channel?.message}</p>
        </div>

        {/* ----------Nested objects --------------- */}

        <div className="form-control">
          <label htmlFor="twitter">Twitter*</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "twitter account is required",
              },
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        {/*--------- Displaying arrays--------- */}

        <div className="form-control">
          <label htmlFor="phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        {/* ----------------dynamic fields ------------------ */}
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input
                  type="text"
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true, // this will make value to store as a number
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth*</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true, // allow to store value in date format
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button type="submit" disabled={!isDirty || !isValid}>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={() => trigger("username")}>
          Manually Trigger validations on username
        </button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValues}>
          Set Values
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
