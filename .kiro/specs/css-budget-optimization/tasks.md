# Implementation Plan

- [x] 1. Create shared style infrastructure





  - Create frontend/src/app/styles directory structure
  - Create _variables.scss with color palette, spacing, and transition variables
  - Create _mixins.scss with reusable style patterns (glass-effect, gradient-text, floating-animation)
  - Create _animations.scss with shared keyframe animations (fadeInUp, floating, pulse, etc.)
  - Create _utilities.scss for common utility classes
  - Import shared modules into main styles.scss
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]* 1.1 Write property test for shared style modules
  - **Property 10: Consistent component file structure**
  - **Validates: Requirements 5.3**

- [ ] 2. Extract styles from course-form component (highest priority - 9.11 KB)
  - Create frontend/src/app/components/courses/course-form/course-form.component.scss
  - Copy all inline styles from course-form.component.ts to the new SCSS file
  - Replace common values with variables from _variables.scss
  - Replace repeated patterns with mixins from _mixins.scss
  - Update component decorator to use styleUrls instead of styles property
  - Remove inline styles array from component TypeScript file
  - Test component renders correctly with external stylesheet
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ]* 2.1 Write property test for style extraction
  - **Property 3: No inline styles exceed threshold**
  - **Validates: Requirements 2.1**

- [ ]* 2.2 Write property test for external stylesheet usage
  - **Property 4: Extracted components use external stylesheets**
  - **Validates: Requirements 2.2**

- [x] 3. Extract styles from dashboard component (12.36 KB)


  - Create frontend/src/app/components/dashboard/dashboard.component.scss
  - Copy all inline styles from dashboard.component.ts to the new SCSS file
  - Identify and extract duplicate animation keyframes to _animations.scss
  - Replace gradient definitions with variables
  - Update component decorator to use styleUrls
  - Remove inline styles from TypeScript file
  - Verify dashboard renders with all animations working
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [x] 4. Extract styles from homepage component (9.53 KB)


  - Create frontend/src/app/components/public/homepage/homepage.component.scss
  - Copy inline styles to external SCSS file
  - Refactor common patterns using shared mixins
  - Update component decorator
  - Remove inline styles
  - Test homepage rendering and interactions
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ] 5. Extract styles from about component (5.74 KB)
  - Create frontend/src/app/components/public/about/about.component.scss
  - Copy inline styles to external SCSS file
  - Apply shared variables and mixins
  - Update component decorator
  - Remove inline styles
  - Verify about page styling
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ] 6. Extract styles from student-list component (5.02 KB)
  - Create frontend/src/app/components/students/student-list/student-list.component.scss
  - Copy inline styles to external SCSS file
  - Optimize with shared styles
  - Update component decorator
  - Remove inline styles
  - Test student list display and interactions
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ] 7. Extract styles from navigation component (4.26 KB)
  - Create frontend/src/app/components/shared/navigation/navigation.component.scss
  - Copy inline styles to external SCSS file
  - Apply shared variables for consistent theming
  - Update component decorator
  - Remove inline styles
  - Test navigation across all pages
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [ ]* 7.1 Write property test for component budget compliance
  - **Property 2: All component styles remain under budget**
  - **Validates: Requirements 1.2**

- [ ] 8. Optimize CSS and remove duplicates
  - Scan all extracted SCSS files for duplicate rules
  - Consolidate duplicate animations into _animations.scss
  - Consolidate duplicate color definitions into _variables.scss
  - Remove redundant media queries by using mixins
  - Ensure no CSS rule appears more than once across all files
  - _Requirements: 3.1, 3.2, 3.4_

- [ ]* 8.1 Write property test for duplicate elimination
  - **Property 6: No duplicate CSS rules in output**
  - **Validates: Requirements 3.2**

- [ ]* 8.2 Write property test for CSS size reduction
  - **Property 7: CSS size reduction meets target**
  - **Validates: Requirements 3.4**

- [ ] 9. Update angular.json budget configuration
  - Increase anyComponentStyle maximumError from 4kb to 8kb (temporary safety margin)
  - Set anyComponentStyle maximumWarning to 6kb
  - Add comments explaining budget rationale
  - Document budget limits in project documentation
  - _Requirements: 4.1, 4.2, 4.4, 4.5_

- [ ]* 9.1 Write property test for budget enforcement
  - **Property 8: Budget enforcement prevents regression**
  - **Validates: Requirements 4.4**

- [ ]* 9.2 Write property test for error message quality
  - **Property 9: Budget errors identify specific files**
  - **Validates: Requirements 4.5**

- [ ] 10. Run production build and validate
  - Execute ng build --configuration=production
  - Verify build completes without budget errors
  - Check that all CSS files are generated correctly
  - Verify total CSS bundle size is reduced by at least 20%
  - Confirm all components load and render correctly
  - _Requirements: 1.1, 1.3, 3.4_

- [ ]* 10.1 Write property test for production build success
  - **Property 1: Production build completes without budget errors**
  - **Validates: Requirements 1.1**

- [ ]* 10.2 Write property test for CSS minification
  - **Property 5: CSS files are minified in production**
  - **Validates: Requirements 3.1**

- [ ] 11. Create CSS architecture documentation
  - Create DOCS/CSS_ARCHITECTURE.md file
  - Document shared style modules and their usage
  - Provide examples of using variables and mixins
  - Document budget limits and guidelines
  - Add troubleshooting section for common CSS issues
  - Include guidelines for creating new components with external styles
  - _Requirements: 5.5_

- [ ]* 11.1 Write property test for naming conventions
  - **Property 11: CSS naming conventions are enforced**
  - **Validates: Requirements 5.4**

- [ ] 12. Final validation and deployment test
  - Run all property-based tests and ensure they pass
  - Perform visual inspection of all affected components
  - Test application in development mode
  - Test application in production mode locally
  - Create test deployment to Vercel
  - Verify Vercel deployment succeeds without budget errors
  - Smoke test deployed application on Vercel
  - _Requirements: 1.1, 1.3, 1.4, 1.5_
