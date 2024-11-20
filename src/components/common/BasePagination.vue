<template>
  <div class="base-pagination">
    <NavButton
      type="step-first"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - maxPagesDisplayed)"
    />

    <NavButton
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

    <PageButton
      v-for="page in displayedPages"
      :key="page"
      :selected="page === currentPage"
      @click="goToPage(page)"
    >
      {{ page }}
    </PageButton>

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

    <NavButton
      type="next"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    />

    <NavButton
      type="step-last"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + maxPagesDisplayed)"
    />
  </div>
</template>

<script>
import { PageButton, NavButton } from "@/components/Buttons";

export default {
  name: "BasePagination",
  components: { PageButton, NavButton },
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
      let selectedPage = page;
      if (page < 1) {
        selectedPage = 1;
      } else if (page > this.totalPages) {
        selectedPage = this.totalPages;
      }
      this.$emit("page-change", selectedPage);
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
