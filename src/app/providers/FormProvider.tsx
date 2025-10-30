import { ReactNode } from "react";
import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";

interface FormProviderProps {
  children: ReactNode;
  form: UseFormReturn<any>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  form,
}) => {
  return <RHFFormProvider {...form}>{children}</RHFFormProvider>;
};

export default FormProvider;
