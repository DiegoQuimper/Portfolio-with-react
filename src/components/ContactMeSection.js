import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Spinner
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";




const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();


  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false); // Nuevo nombre
  useEffect(() => {
    if (isFormSubmited) {
      onOpen(response.type, response.message)
      if (response.type === 'success') {
        formik.resetForm()
      }
    }
  }, [response])



  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe',
      comment: ''
    },
    onSubmit: (values) => { },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      email: Yup.string().required('Required').email('Invalid email address'),
      comment: Yup.string().required('Required').min(25, 'Must be at least 25 characters')
    }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoadingButton(true);

    try {
      await submit("customUrl", formik.values);
      setIsFormSubmited(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">

        <Heading as="h1" id="contactme-section">Contact me</Heading>

        <Box p={6} rounded="md" w="100%">

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>

              <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName ? true : false}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.email && formik.touched.email ? true : false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isInvalid={formik.errors.comment && formik.touched.comment ? true : false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              <Button
                disabled={
                  Object.keys(formik.errors).length > 0 ||
                  Object.keys(formik.touched).length === 0
                }
                type="submit"
                colorScheme="purple"
                width="full"
              >
                {isLoadingButton ? <Spinner size="sm" /> : "Submit"}
              </Button>

            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;  