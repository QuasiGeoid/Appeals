<template>
  <div class="base-pagination">
    <PageNavButton
      type="first"
      :disabled="currentPage === 1"
      @click="goToPage(1)"
    />

    <PageNavButton
      type="prev"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    />

    <PageButton v-if="displayedPages[0] > 1" @click="goToPage(1)"
      >1
    </PageButton>

    <span v-if="displayedPages[0] > 2" class="base-pagination__ellipsis"
      >...</span
    >

    <span v-for="page in displayedPages" :key="page">
      <PageButton :selected="page == currentPage" @click="goToPage(page)">
        {{ page }}
      </PageButton>
    </span>

    <span
      v-if="displayedPages.at(-1) < totalPages - 1"
      class="base-pagination__ellipsis"
      >...</span
    >
    <PageButton
      v-if="displayedPages.at(-1) < totalPages"
      @click="goToPage(totalPages)"
      >{{ totalPages }}
    </PageButton>

    <PageNavButton
      type="next"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    />

    <PageNavButton
      type="last"
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
    />
  </div>
</template>

<script>
import { PageButton, PageNavButton } from "@/components/Buttons";

export default {
  name: "BasePagination",
  components: { PageButton, PageNavButton },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxPagesDisplayed: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    displayedPages() {
      const pages = [];
      const halfMax = Math.floor(this.maxPagesDisplayed / 2);

      if (this.currentPage >= this.totalPages - 1) {
        // If on last page or second to last page, show last 5 pages
        const start = Math.max(this.totalPages - this.maxPagesDisplayed + 1, 1);
        for (let page = start; page <= this.totalPages; page++) {
          pages.push(page);
        }
      } else {
        // Show pages around the current page
        const start = Math.max(1, this.currentPage - halfMax);
        const end = Math.min(
          this.totalPages,
          start + this.maxPagesDisplayed - 1
        );

        for (let page = start; page <= end; page++) {
          pages.push(page);
        }
      }

      return pages;
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-change", page);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.base-pagination
  display: flex
  gap: 0.75rem
  align-items: center

  &__ellipsis
    color: $color-nav-btn-txt
</style>
