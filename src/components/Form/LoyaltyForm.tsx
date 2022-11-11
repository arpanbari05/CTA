import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Button,
  CloseButton,
  FloatableInput,
  SelectInput,
  SelectSearchableInput,
} from "..";
import { ls, sm, xs } from "../../utils/breakpoints";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import "./LoyaltyForm.css";
import { useLoyaltyFormFields, useRequestCall } from "../../customHooks";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const LoyaltyForm: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);
  const [whatsappChecked, setWhatsappChecked] = useState(false);
  const form = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = form;
  const state = watch();
  const {
    fields,
    currentLocation,
    setStoreSearchQuery,
    shouldInitializeStore,
    setShouldInitializeStore,
    getCategory,
  } = useLoyaltyFormFields(state, setValue);
  const { mutateAsync, isLoading } = useRequestCall();

  const onSubmit = async (data: any) => {
    if (currentLocation?.postal) {
      const category = getCategory();
      await mutateAsync({
        userId: 27014,
        InputOfCustomer: {
          LeadID: uuidv4(),
          CustomerName: data.name,
          CustomerMobileNumber: `+91${data.mobile}`,
          CustomerEmailID: data.email,
          StoreCode: data.store,
          CampaignName: "Virtual Zone",
          LeadCreationDate: new Date(),
          LeadCategory: category,
          RequestType: 1,
          PinCode: +currentLocation.postal,
        },
      });
      handleClose({ showToast: true });
    }
  };

  const handleClose = (forwardData: any = {}) => {
    window.parent.postMessage({ type: "oniframeclose", ...forwardData });
  };

  const handleCheckbox = (e: any) => {
    setChecked(e.target.checked);
  };

  const handleWhatsappCheckbox = (e: any) => {
    setWhatsappChecked(e.target.checked);
  };

  return (
    <LoyaltyFormWrapper>
      <div className="header d-flex gap-3 justify-content-between align-items-center px-4 py-3 bg-black text-white">
        <div>Request call back</div>
        <CloseButton onClick={() => handleClose()} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        {fields.map((field) =>
          field.type !== "select" ? (
            <FloatableInput
              key={field.name}
              placeholder={field.placeholder}
              error={errors[field.name]?.message}
              type={field.type}
              register={register(field.name, { ...field.validation })}
              maxLength={field.validation?.maxLength?.value || Infinity}
            />
          ) : field.search ? (
            <SelectSearchableInput
              key={field.name}
              placeholder={field.placeholder}
              options={field.options || []}
              form={form}
              onChange={(e) => setStoreSearchQuery(e.target.value)}
              looseFocusCallback={() => setStoreSearchQuery("")}
              shouldInitializeStore={shouldInitializeStore}
              setShouldInitializeStore={setShouldInitializeStore}
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
              I Agree to the{" "}
              <button style={{ color: "var(--light-blue)" }}>
                Terms and Conditions
              </button>{" "}
              of the program.
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
          <Button
            styledCss="height: 44px;"
            disabled={!checked}
            isLoading={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </LoyaltyFormWrapper>
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
