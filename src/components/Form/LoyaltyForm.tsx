import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, CloseButton, FloatableInput, SelectInput } from "..";
import { ls, sm, xs } from "../../utils/breakpoints";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { Modal } from "react-bootstrap";
import "./LoyaltyForm.css";
import { useLoyaltyFormFields } from "../../customHooks";

interface Props {}

const LoyaltyForm: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);
  const [whatsappChecked, setWhatsappChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  // const { data } = useCurrentLocation();
  const state = watch("state");
  const loyaltyFormFields = useLoyaltyFormFields(state);

  // useEffect(() => {
  //   if (data && (state === data.region || !Boolean(state))) {
  //     setValue("city", data.city);
  //     setValue("state", data.region);
  //   }
  // }, [data, setValue, state]);

  useEffect(() => {
    setValue("city", "Gurugram");
    setValue("state", "Haryana");
  }, [setValue]);

  const onSubmit = (data: any) => {};

  const handleCheckbox = (e: any) => {
    setChecked(e.target.checked);
  };

  const handleWhatsappCheckbox = (e: any) => {
    setWhatsappChecked(e.target.checked);
  };

  return (
    <Modal show centered>
      <LoyaltyFormWrapper>
        <div className="header d-flex gap-3 justify-content-between align-items-center px-4 py-3 text-white">
          <div>Request call back</div>
          <CloseButton className="loyalty-form-close-btn" onClick={() => {}} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          {loyaltyFormFields.map((field) =>
            field.type !== "select" ? (
              <FloatableInput
                key={field.name}
                placeholder={field.placeholder}
                error={errors[field.name]?.message}
                type={field.type}
                register={register(field.name, { ...field.validation })}
                maxLength={field.validation?.maxLength?.value || Infinity}
              />
            ) : (
              <SelectInput
                key={field.name}
                placeholder={field.placeholder}
                error={errors[field.name]?.message}
                register={register(field.name, { ...field.validation })}
                options={field.options || []}
              />
            )
          )}
          <div className="d-grid gap-3 mt-auto">
            <label className="d-flex gap-2 align-items-start">
              <input
                type="checkbox"
                onChange={handleCheckbox}
                className="visually-hidden"
              />
              {checked ? (
                <MdCheckBox size={25} color="#3583e4" />
              ) : (
                <MdCheckBoxOutlineBlank size={25} color="gray" />
              )}
              <div>
                I Agree to the <a href="#a">Terms and Conditions</a> of the
                program.
              </div>
            </label>
            <label className="d-flex gap-2 align-items-start">
              <input
                type="checkbox"
                onChange={handleWhatsappCheckbox}
                className="visually-hidden"
              />
              {whatsappChecked ? (
                <MdCheckBox size={25} color="#3583e4" />
              ) : (
                <MdCheckBoxOutlineBlank size={25} color="gray" />
              )}
              <div>Connect on Whatsapp</div>
            </label>
            <Button disabled={!checked} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </LoyaltyFormWrapper>
    </Modal>
  );
};

export default LoyaltyForm;

const LoyaltyFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 29rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  overflow: auto;
  pointer-events: all;

  .header {
    font-size: 1.2rem;
    font-weight: bold;
    background-color: black;
  }

  form {
    gap: 2.85rem;
    padding: 2rem;
    flex-basis: 100%;
    overflow: auto;
  }

  ${ls} {
    width: 80%;
  }

  ${sm} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    z-index: 500;
  }

  ${xs} {
    form {
      padding: 1rem;
    }
  }
`;
