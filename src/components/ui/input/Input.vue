<script setup lang="ts">
  import "./Input.scss";
  import 'air-datepicker/air-datepicker.css';
  import iconCalendar from '@/assets/images/icon-calendar.svg';

  import { onMounted, computed, ref } from "vue";
  import { v4 as uuid } from '@lukeed/uuid';
  import AirDatepicker from 'air-datepicker';
  import dayjs from 'dayjs';
  import type { Ref } from 'vue';

  // Emits
  const emit = defineEmits(['update:modelValue']);

  // id for label
  const uid = uuid();
  const focus = ref(false);
  const input: Ref<string | HTMLElement > = ref("")

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

  // Computed
  const $$css = computed(() => {
    return [
      "at-control",
      focus.value ? "at-control-focused" : "",
      // props.loading ? "" : "",
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
      <template v-if="nativeType === 'date'">
        <img
          :src="iconCalendar"
          alt="calendar"
          class="at-datepicker-icon"
        >
      </template>
    </div>

    <template v-if="loading">
      <svg class="absolute right-2 bottom-2.5 animate-spin text-gray-500 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </template>
  </div>
</template>

