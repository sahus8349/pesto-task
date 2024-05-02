import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./Modal";
import Typography from "../Typography/Typography";

export default {
  tags: ["autodocs"],
  title: "Components/Modal",
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => (
  <Modal {...args}>
    <ModalHeader>
      <Typography variant="h2" className="font-bold">
        Modal Title
      </Typography>
    </ModalHeader>
    <ModalBody>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
      <p>This is the modal content.</p>
    </ModalBody>
    <ModalFooter>
      <button onClick={args.onClose}>Close</button>
    </ModalFooter>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
export const RightModalMd = Template.bind({});
RightModalMd.args = {
  isOpen: true,
  placement: "right",
  size: "medium",
};
export const RightModal = Template.bind({});
RightModal.args = {
  isOpen: true,
  placement: "right",
  size: "large",
};
export const LeftModal = Template.bind({});
LeftModal.args = {
  isOpen: true,
  placement: "left",
  size: "small",
};
