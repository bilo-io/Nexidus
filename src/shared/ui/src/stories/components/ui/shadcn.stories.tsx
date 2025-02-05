import React from 'react';
import { Meta } from '@storybook/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDialog,
  AspectRatio,
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DatePicker,
  Dialog,
  DropdownMenu,
  Form,
  HoverCard,
  Input,
  Label,
  Menubar,
  NavigationMenu,
  Popover,
  Progress,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Slider,
  Switch,
  Table,
  Tabs,
  Textarea,
  Toast,
  Toggle,
  Tooltip,
} from '@/components/ui';

export default {
  title: 'Components/ui/shadcn',
  tags: ['autodocs'],
} as Meta;

// #region Accordion
export const AccordionStory = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Accordion Item 1</AccordionTrigger>
      <AccordionContent>Content for item 1</AccordionContent>
    </AccordionItem>
  </Accordion>
);
AccordionStory.storyName = 'Accordion';
// #endregion

// #region Alert
export const AlertStory = () => (
  <Alert variant="destructive">
    <strong>Error:</strong> Something went wrong!
  </Alert>
);
AlertStory.storyName = 'Alert';
// #endregion

// #region AlertDialog
export const AlertDialogStory = () => <AlertDialog />;
AlertDialogStory.storyName = 'AlertDialog';
// #endregion

// #region AspectRatio
export const AspectRatioStory = () => <AspectRatio />;
AspectRatioStory.storyName = 'AspectRatio';
// #endregion

// #region Avatar
export const AvatarStory = () => (
  <>
    <Avatar />
    <AvatarImage />
  </>
);
AvatarStory.storyName = 'Avatar';
// #endregion

// #region Badge
export const BadgeStory = () => <Badge />;
BadgeStory.storyName = 'Badge';
// #endregion

// #region Button
export const ButtonStory = () => <Button />;
ButtonStory.storyName = 'Button';
// #endregion

// #region Calendar
export const CalendarStory = () => <Calendar />;
CalendarStory.storyName = 'Calendar';
// #endregion

// #region Card
export const CardStory = () => <Card />;
CardStory.storyName = 'Card';
// #endregion

// #region Checkbox
export const CheckboxStory = () => <Checkbox />;
CheckboxStory.storyName = 'Checkbox';
// #endregion

// #region Collapsible
export const CollapsibleStory = () => <Collapsible />;
CollapsibleStory.storyName = 'Collapsible';
// #endregion

// #region Combobox
export const ComboboxStory = () => <Combobox />;
ComboboxStory.storyName = 'Combobox';
// #endregion

// #region Command
export const CommandStory = () => <Command />;
CommandStory.storyName = 'Command';
// #endregion

// #region ContextMenu
export const ContextMenuStory = () => <ContextMenu />;
ContextMenuStory.storyName = 'ContextMenu';
// #endregion

// #region DatePicker
export const DatePickerStory = () => <DatePicker />;
DatePickerStory.storyName = 'DatePicker';
// #endregion

// #region Dialog
export const DialogStory = () => <Dialog />;
DialogStory.storyName = 'Dialog';
// #endregion

// #region DropdownMenu
export const DropdownMenuStory = () => <DropdownMenu />;
DropdownMenuStory.storyName = 'DropdownMenu';
// #endregion

// #region Form
export const FormStory = () => <Form />;
FormStory.storyName = 'Form';
// #endregion

// #region HoverCard
export const HoverCardStory = () => <HoverCard />;
HoverCardStory.storyName = 'HoverCard';
// #endregion

// #region Input
export const InputStory = () => <Input />;
InputStory.storyName = 'Input';
// #endregion

// #region Label
export const LabelStory = () => <Label />;
LabelStory.storyName = 'Label';
// #endregion

// #region Menubar
export const MenubarStory = () => <Menubar />;
MenubarStory.storyName = 'Menubar';
// #endregion

// #region NavigationMenu
export const NavigationMenuStory = () => <NavigationMenu />;
NavigationMenuStory.storyName = 'NavigationMenu';
// #endregion

// #region Popover
export const PopoverStory = () => <Popover />;
PopoverStory.storyName = 'Popover';
// #endregion

// #region Progress
export const ProgressStory = () => <Progress />;
ProgressStory.storyName = 'Progress';
// #endregion

// #region RadioGroup
export const RadioGroupStory = () => <RadioGroup />;
RadioGroupStory.storyName = 'RadioGroup';
// #endregion

// #region ScrollArea
export const ScrollAreaStory = () => <ScrollArea />;
ScrollAreaStory.storyName = 'ScrollArea';
// #endregion

// #region Select
export const SelectStory = () => <Select />;
SelectStory.storyName = 'Select';
// #endregion

// #region Separator
export const SeparatorStory = () => <Separator />;
SeparatorStory.storyName = 'Separator';
// #endregion

// #region Sheet
export const SheetStory = () => <Sheet />;
SheetStory.storyName = 'Sheet';
// #endregion

// #region Skeleton
export const SkeletonStory = () => <Skeleton />;
SkeletonStory.storyName = 'Skeleton';
// #endregion

// #region Slider
export const SliderStory = () => <Slider />;
SliderStory.storyName = 'Slider';
// #endregion

// #region Switch
export const SwitchStory = () => <Switch />;
SwitchStory.storyName = 'Switch';
// #endregion

// #region Table
export const TableStory = () => <Table />;
TableStory.storyName = 'Table';
// #endregion

// #region Tabs
export const TabsStory = () => <Tabs />;
TabsStory.storyName = 'Tabs';
// #endregion

// #region Textarea
export const TextareaStory = () => <Textarea />;
TextareaStory.storyName = 'Textarea';
// #endregion

// #region Toast
export const ToastStory = () => <Toast />;
ToastStory.storyName = 'Toast';
// #endregion

// #region Toggle
export const ToggleStory = () => <Toggle />;
ToggleStory.storyName = 'Toggle';
// #endregion

// #region Tooltip
export const TooltipStory = () => <Tooltip />;
TooltipStory.storyName = 'Tooltip';
// #endregion