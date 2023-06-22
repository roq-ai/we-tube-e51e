import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createReaction } from 'apiSdk/reactions';
import { Error } from 'components/error';
import { reactionValidationSchema } from 'validationSchema/reactions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { getVideos } from 'apiSdk/videos';
import { getUsers } from 'apiSdk/users';
import { ReactionInterface } from 'interfaces/reaction';

function ReactionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReactionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReaction(values);
      resetForm();
      router.push('/reactions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReactionInterface>({
    initialValues: {
      type: '',
      video_id: (router.query.video_id as string) ?? null,
      viewer_id: (router.query.viewer_id as string) ?? null,
    },
    validationSchema: reactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Reaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
            <FormLabel>Type</FormLabel>
            <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
            {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<VideoInterface>
            formik={formik}
            name={'video_id'}
            label={'Select Video'}
            placeholder={'Select Video'}
            fetcher={getVideos}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'viewer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'reaction',
  operation: AccessOperationEnum.CREATE,
})(ReactionCreatePage);
