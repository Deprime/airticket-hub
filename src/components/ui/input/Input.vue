<script setup lang="ts">
  // Assets
  import "./Input.scss";
  import 'air-datepicker/air-datepicker.css';
  import iconCalendar from '@/assets/images/icon-calendar.svg';

  import { onMounted, computed, ref } from "vue";
  import { v4 as uuid } from '@lukeed/uuid';
  import AirDatepicker from 'air-datepicker';
  import dayjs from 'dayjs';

  import Loader from './Loader.vue'

  // Types
  import type { Ref } from 'vue';

  // Emits
  const emit = defineEmits(['update:modelValue']);

  // Props
  const props = defineProps({
    inputCss: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nativeType: {
      type: String,
      default: "text",
    },
    variant: {
      type: String,
      default: "default",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  });

  // Data
  const uid = uuid(); // id for label
  const focus = ref(false);
  const input: Ref<string | HTMLElement > = ref("")

  // Computed
  const $$css = computed(() => {
    return [
      "at-control",
      focus.value ? "at-control-focused" : "",
      props.loading ? "at-control-loading" : "",
      props.disabled ? "at-control-disabled" : "",
    ]
    .join(" ");
  });

  const $$inputCss   = computed(() => ["at-control-input", props.inputCss].join(" "));
  const $$nativeType = computed(() => (props.nativeType === 'date') ? 'text' : props.nativeType);
  const $$readonly   = computed(() => (props.nativeType === 'date') ? true : false);

  // Methods
  const onInput = (e: Event): void => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }

  /**
   * On mount datepicker
   */
  const mountDatepicker = (): void => {
    const format = 'YYYY-MM-DD';
    const datepicker = new AirDatepicker(input.value, {
      dateFormat: format.toLowerCase(),
      autoClose: true,
      onSelect({date}) {
        const value = dayjs(<Date>date).format(format);
        emit('update:modelValue', value);
      }
    });
  }

  onMounted(() => {
    if (props.nativeType === "date") {
      mountDatepicker();
    }
  })
</script>

<template>
  <div :class="$$css">
    <label
      v-if="label"
      :for="uid"
    >
      {{ label }}
    </label>

    <div class="flex flex-row">
      <slot name="prepend"></slot>
      <input
        autocomplete="off"
        ref="input"
        :class="$$inputCss"
        :id="uid"
        :disabled="disabled"
        :readonly="$$readonly"
        :type="$$nativeType"
        :variant="variant"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        @focus="focus = true"
        @blur="focus = false"
      />
      <img
        v-if="nativeType === 'date'"
        :src="iconCalendar"
        alt="calendar"
        class="at-datepicker-icon"
      />
    </div>

    <Loader v-if="loading" />
  </div>
</template>

